import React, {useRef, useState} from 'react'
import {Box, Button, colors, IconButton, MenuItem, Popover, TextField} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {User} from '../models/User'
import {allTaskStatus, TaskStatus} from '../models/TaskStatus'
import LoaderComponent from './LoaderComponent'
import ChipStatus from './ChipStatus'
import ErrorSnackbar from './ErrorSnackbar'
import {HandleOpenRef} from '../models/HandelOpenRef'

const FilterTasks: React.FC<{ handleFilterChange: (userId?: number, status?: TaskStatus) => void }> = ({
                                                                                                           handleFilterChange,
                                                                                                       }) => {
    // Remote vars
    const [users, setUsers] = useState<User[] | undefined>(undefined)

    // Anchors
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Open popover
        setAnchorEl(event.currentTarget)

        // Fetch users
        fetch('https://localhost:7278/api/Users', {method: 'GET'})
            .then((res) => res.json())
            .then((usersApi: User[]) => {
                setUsers(usersApi)
            })
            .catch((_) => errorSnackbarRef.current?.handleOpen())
    }
    const handleClose = () => {
        // Reset users
        setUsers(undefined)

        // close popover
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'filter-tasks-popover' : undefined

    // Filter user id
    const [userId, setUserId] = useState<number | undefined>(undefined)
    const handleSelectUserChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const value = Number.parseInt(e.target.value)
        setUserId(value)
        handleFilterChange(value, status)
    }

    // Filter status
    const [status, setStatus] = useState<TaskStatus | undefined>(undefined)
    const handleSelectStatusChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const value = Number.parseInt(e.target.value)
        setStatus(value)
        handleFilterChange(userId, value)
    }

    // Reset Filter
    const resetFilter = () => {
        setUserId(undefined)
        setStatus(undefined)
        handleFilterChange(undefined, undefined)
    }

    // Ref Error snackbar
    const errorSnackbarRef = useRef<HandleOpenRef>(null)

    return (
        <>
            <ErrorSnackbar ref={errorSnackbarRef}/>

            <IconButton aria-label="filter" onClick={handleOpen}>
                <FilterAltIcon/>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <Box
                    width={300}
                    p={3}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={3}
                    border={'2px solid' + colors.grey[600]}>
                    {users === undefined ? (
                        <LoaderComponent/>
                    ) : (
                        <>
                            <TextField
                                id="attribution"
                                select
                                label="Attribution"
                                size="small"
                                value={userId ?? ''}
                                onChange={handleSelectUserChange}>
                                <MenuItem key={0} value={0}>
                                    -
                                </MenuItem>
                                {users?.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.lastname} {user.firstname}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="status"
                                select
                                label="Status"
                                required
                                size="small"
                                value={status ?? ''}
                                onChange={handleSelectStatusChange}>
                                {allTaskStatus.map((s) => (
                                    <MenuItem key={s} value={s}>
                                        <ChipStatus status={s}/>
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button fullWidth variant="contained" color="primary" onClick={resetFilter}>
                                Réinitialiser
                            </Button>
                        </>
                    )}
                </Box>
            </Popover>
        </>
    )
}

export default FilterTasks
