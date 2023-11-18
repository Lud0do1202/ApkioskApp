import React, {useState} from 'react'
import {Task} from '../models/Task'
import {USERS} from '../MOCK/UsersMock'
import {User} from '../models/User'
import {allTaskStatus, TaskStatus} from '../models/TaskStatus'
import {Box, Button, colors, Container, MenuItem, Modal, Paper, TextField} from '@mui/material'
import ChipStatus from './ChipStatus'
import LoaderComponent from './LoaderComponent'
import ModalHeader from './ModalHeader'
import {CrudTasks} from '../models/CrudTasks'
import {HandleOpenModalRef} from '../models/HandleOpenModalRef'

const ModalEditTask = React.forwardRef<HandleOpenModalRef, { task: Task | undefined; crudTasks: CrudTasks }>(
    (props, ref) => {
        // Get props
        const {task, crudTasks} = props

        // If it's a create task
        const isCrudCreate = task === undefined

        // Open modal from parent
        React.useImperativeHandle(ref, () => ({
            handleOpen() {
                // Open modal
                setOpen(true)

                // Fetch users
                setTimeout(() => {
                    setUsers(USERS)
                }, 500)
            },
        }))

        // Remote vars
        const [users, setUsers] = useState<User[] | undefined>(undefined)

        // Modal
        const [open, setOpen] = useState(false)

        const handleClose = () => {
            // Reset all users (save memory)
            setUsers(undefined)

            // Reset form
            resetForm()

            // Close modal
            setOpen(false)
        }

        // Form
        const [label, setLabel] = useState<string | undefined>(task?.label)
        const [status, setStatus] = useState<TaskStatus | undefined>(task?.status)
        const [userId, setUserId] = useState<number | undefined>(task?.user?.id)

        // Errors
        const [errorLabel, setErrorLabel] = useState<string | undefined>(undefined)
        const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined)

        // Reset form
        const resetForm = () => {
            setLabel(task?.label)
            setStatus(task?.status)
            setUserId(task?.user?.id)
            setErrorLabel(undefined)
            setErrorStatus(undefined)
        }

        // Submit form
        const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
            // Prevent default submit event
            event.preventDefault()

            // Has error
            let hasError = false

            // Check label
            if (label === undefined || label.trim() === '') {
                hasError = true
                setErrorLabel('Champ obligatoire')
            } else if (label.length > 255) {
                hasError = true
                setErrorLabel('Max 255 caractères')
            } else {
                setErrorLabel(undefined)
            }

            // Check status
            if (status === undefined) {
                hasError = true
                setErrorStatus('Champ obligatoire')
            } else {
                setErrorStatus(undefined)
            }

            // ERROR
            if (hasError) return

            // Create the task
            const editedTask: Task = {
                id: task?.id ?? 0,
                label: label!,
                status: status!,
                user: users!.find((user) => user.id === userId) ?? null,
            }

            // Create / Update a new task
            crudTasks(isCrudCreate ? 'create' : 'update', editedTask)

            // Close modal
            handleClose()
        }

        return (
            <Modal open={open} onClose={handleClose}>
                <Container maxWidth={'sm'}>
                    <Box p={2} component={Paper} elevation={12}>
                        {users === undefined ? (
                            <LoaderComponent/>
                        ) : (
                            <>
                                {/* FORM */}
                                <form onSubmit={submit} noValidate>
                                    {/* Header */}
                                    <ModalHeader
                                        text={isCrudCreate ? 'Nouvelle tâche' : "Modification d'une tâche"}
                                        handleClose={handleClose}
                                    />

                                    {/* Body */}
                                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                                        <TextField
                                            id="label"
                                            error={errorLabel !== undefined}
                                            helperText={errorLabel}
                                            label="Libellé de la tâche"
                                            required
                                            defaultValue={label}
                                            onChange={(e) => setLabel(e.target.value)}
                                            size="small"
                                        />

                                        <TextField
                                            id="attribution"
                                            select
                                            label="Attribution"
                                            defaultValue={userId}
                                            size="small"
                                            onChange={(e) => setUserId(Number.parseInt(e.target.value))}>
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
                                            error={errorStatus !== undefined}
                                            helperText={errorStatus}
                                            label="Status"
                                            required
                                            defaultValue={task?.status}
                                            size="small"
                                            onChange={(e) => setStatus(Number.parseInt(e.target.value))}>
                                            {allTaskStatus.map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    <ChipStatus status={s}/>
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>

                                    {/* Footer */}
                                    <Box
                                        mt={4}
                                        pt={2}
                                        gap={2}
                                        display={'flex'}
                                        justifyContent={'end'}
                                        alignContent={'center'}
                                        color={colors.grey[500]}
                                        sx={{borderTop: '3px solid ' + colors.grey[400]}}>
                                        <Button variant="text" color={'inherit'} onClick={handleClose}>
                                            Annuler
                                        </Button>
                                        <Button type="submit" variant="contained" color={'primary'}>
                                            {isCrudCreate ? 'Ajouter' : 'Modifier'}
                                        </Button>
                                    </Box>
                                </form>
                            </>
                        )}
                    </Box>
                </Container>
            </Modal>
        )
    }
)
export default ModalEditTask
