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
	]

	const [rows, setRows] = useState<Task[] | undefined>(undefined)

	useEffect(() => {
		setTimeout(() => {
			setRows(TASKS_MOCK)
		}, 1500)
	})

	return (
		<Box mt={3} mx={5}>
			{rows === undefined ? (
				<Typography>LOADING</Typography>
			) : (
				<TableContainer>
					<Table sx={{ minWidth: 800 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableHeadCell text={'Libellé'} width={'60%'}></TableHeadCell>
								<TableHeadCell text={'Attribution'}></TableHeadCell>
								<TableHeadCell text={'Status'}></TableHeadCell>
								<TableHeadCell text={'Actions'}></TableHeadCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow key={index}>
									<TableCell align={'center'}>{row.label}</TableCell>
									<TableCell align={'center'}>
										<Box display={'flex'} justifyContent={'center'}>
											<Avatar
												component={'span'}
												alt={`${row.user.lastname} ${row.user.firstname}`}
												src={row.user.avatar}
											/>
										</Box>
									</TableCell>
									<TableCell align={'center'}>
										<ChipStatus status={row.status}></ChipStatus>
									</TableCell>
									<TableCell align={'center'}>
										<EditTaskButton user={row.user} />
										<DeleteTaskButton user={row.user} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Box>
	)
}
export default TasksTable
