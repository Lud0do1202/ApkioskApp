import React, { useEffect, useState } from 'react'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Avatar,
	TableFooter,
	Pagination,
} from '@mui/material'
import TableHeadCell from './TableHeadCell'
import { Task } from '../models/Task'
import { TaskStatus } from '../models/TaskStatus'
import { User } from '../models/User'
import ChipStatus from './ChipStatus'
import EditTaskButton from './EditTaskButton'
import DeleteTaskButton from './DeleteTaskButton'

const TasksTable: React.FC = () => {
	const USERS: User[] = [
		{
			id: 1,
			firstname: 'Rick',
			lastname: 'Smith',
			avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe5hVVP2qvL9JFd0LjL6YUDjimXxyf26rN5g&usqp=CAU',
		},
		{
			id: 2,
			firstname: 'Morty',
			lastname: 'Smith',
			avatar:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ON5zvhQIWntdO086fSKtm8o61RgsdvmJlK77Y9oGFgkBy-yHXXUuZTAIX_-N--vnhjw&usqp=CAU',
		},
	]

	const TASKS_MOCK: Task[] = [
		{
			id: 1,
			label: 'Label 1',
			status: TaskStatus.InProgress,
			user: USERS[0],
		},
		{
			id: 2,
			label: 'Label 2',
			status: TaskStatus.Blocked,
			user: USERS[0],
		},
		{
			id: 3,
			label: 'Label 3',
			status: TaskStatus.Completed,
			user: USERS[1],
		},
		{
			id: 4,
			label: 'Label 4',
			status: TaskStatus.InProgress,
			user: USERS[0],
		},
		{
			id: 5,
			label: 'Label 5',
			status: TaskStatus.Blocked,
			user: USERS[0],
		},
		{
			id: 6,
			label: 'Label 6',
			status: TaskStatus.Completed,
			user: USERS[1],
		},
		{
			id: 7,
			label: 'Label 7',
			status: TaskStatus.InProgress,
			user: USERS[1],
		},
		{
			id: 8,
			label: 'Label 8',
			status: TaskStatus.Blocked,
			user: USERS[0],
		},
		{
			id: 9,
			label: 'Label 9',
			status: TaskStatus.Completed,
			user: USERS[0],
		},
		{
			id: 10,
			label: 'Label 10',
			status: TaskStatus.InProgress,
			user: USERS[1],
		},
		{
			id: 11,
			label: 'Label 11',
			status: TaskStatus.Blocked,
			user: USERS[0],
		},
		{
			id: 12,
			label: 'Label 12',
			status: TaskStatus.Completed,
			user: USERS[0],
		},
		{
			id: 13,
			label: 'Label 13',
			status: TaskStatus.InProgress,
			user: USERS[1],
		},
		{
			id: 14,
			label: 'Label 14',
			status: TaskStatus.Blocked,
			user: USERS[0],
		},
		{
			id: 15,
			label: 'Label 15',
			status: TaskStatus.Completed,
			user: USERS[0],
		},
		{
			id: 16,
			label: 'Label 16',
			status: TaskStatus.InProgress,
			user: USERS[1],
		},
		{
			id: 17,
			label: 'Label 17',
			status: TaskStatus.Blocked,
			user: USERS[0],
		},
		{
			id: 18,
			label: 'Label 18',
			status: TaskStatus.Completed,
			user: USERS[0],
		},
		{
			id: 19,
			label: 'Label 19',
			status: TaskStatus.InProgress,
			user: USERS[1],
		},
		{
			id: 20,
			label: 'Label 20',
			status: TaskStatus.Blocked,
			user: USERS[0],
		},
	]

	const [tasks, setTasks] = useState<Task[] | undefined>(undefined)

	useEffect(() => {
		setTimeout(() => {
			setTasks(TASKS_MOCK)
		}, 1500)
	})

	const [page, setPage] = useState(1)
	const nbRowsShown = 7

	const updateTasksUI: (event: React.ChangeEvent<unknown>, page: number) => void = (event, page): void => {
		setPage(page)
	}

	return (
		<Box mt={3} mx={5}>
			{tasks === undefined ? (
				<Typography>LOADING</Typography>
			) : (
				<TableContainer>
					<Table sx={{ minWidth: 800 }} aria-label="tasks table">
						<TableHead>
							<TableRow>
								<TableHeadCell text={'Libellé'} width={'60%'} />
								<TableHeadCell text={'Attribution'} />
								<TableHeadCell text={'Status'} />
								<TableHeadCell text={'Actions'} />
							</TableRow>
						</TableHead>
						<TableBody>
							{tasks.slice((page - 1) * nbRowsShown, (page - 1) * nbRowsShown + nbRowsShown).map((task, index, array) => (
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
										<EditTaskButton user={task.user} />
										<DeleteTaskButton user={task.user} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell style={{borderBottom: "none"}} colSpan={4}>
									<Pagination
										className="table-pagination"
										count={Math.ceil(tasks.length / nbRowsShown)}
										variant="outlined"
										color="primary"
										hidePrevButton
										hideNextButton
										page={page}
										onChange={updateTasksUI}
									/>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			)}
		</Box>
	)
}
export default TasksTable
