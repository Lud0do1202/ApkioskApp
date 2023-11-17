import {
	Avatar,
	Box,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
} from '@mui/material'
import React, {useState} from 'react'
import ChipStatus from './ChipStatus'
import DeleteTaskButton from './DeleteTaskButton'
import EditTaskButton from './EditTaskButton'
import TableHeadCell from './TableHeadCell'
import {Task} from '../models/Task'

const TaskTableContainer: React.FC<{ tasks: Task[] }> = ({tasks}) => {
    // Current page of the table
    const [page, setPage] = useState(1)

    // Number of rows to show
    const nbRowsShown = 7

    // Update the current page
    const updatePage: (event: React.ChangeEvent<unknown>, page: number) => void = (event, page): void => {
        setPage(page)
    }

    return (
        <TableContainer>
            <Table sx={{minWidth: 800}} aria-label="tasks table">
                <TableHead>
                    <TableRow>
                        <TableHeadCell text={'Libellé'} width={'60%'}/>
                        <TableHeadCell text={'Attribution'}/>
                        <TableHeadCell text={'Status'}/>
                        <TableHeadCell text={'Actions'}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.slice((page - 1) * nbRowsShown, (page - 1) * nbRowsShown + nbRowsShown).map((task) => (
                        <TableRow key={task.id}>
                            <TableCell align={'center'}>{task.label}</TableCell>
                            <TableCell align={'center'}>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <Avatar
                                        component={'span'}
                                        alt={`${task.user.lastname} ${task.user.firstname}`}
                                        src={task.user.avatar}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell align={'center'}>
                                <ChipStatus status={task.status}></ChipStatus>
                            </TableCell>
                            <TableCell align={'center'}>
                                <EditTaskButton user={task.user}/>
                                <DeleteTaskButton user={task.user}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell style={{borderBottom: 'none'}} colSpan={4}>
                            <Pagination
                                className="table-pagination"
                                count={Math.ceil(tasks.length / nbRowsShown)}
                                variant="outlined"
                                color="primary"
                                hidePrevButton
                                hideNextButton
                                page={page}
                                onChange={updatePage}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default TaskTableContainer
