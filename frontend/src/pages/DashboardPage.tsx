import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PieChartStatus from '../components/PieChartStatus'
import { Task } from '../models/Task'
import LoaderPage from '../components/LoaderPage'
import BarCharTask from '../components/BarCharTask'
import { User } from '../models/User'

const DashboardPage: React.FC = () => {
	// Fetch tasks
	const [tasks, setTasks] = useState<Task[] | undefined>(undefined)
	useEffect(() => {
		fetch('https://localhost:7278/api/Tasks', { method: 'GET' })
			.then((res) => res.json())
			.then((tasksApi: Task[]) => setTasks(tasksApi))
			.catch((e) => console.error(e))
	}, [])

	// Fetch users
	const [users, setUsers] = useState<User[] | undefined>(undefined)
	useEffect(() => {
		fetch('https://localhost:7278/api/Users', { method: 'GET' })
			.then((res) => res.json())
			.then((usersApi: User[]) => setUsers(usersApi))
			.catch((e) => console.error(e))
	}, [])

	return (
		<>
			{tasks === undefined || users === undefined ? (
				<LoaderPage />
			) : (
				<Box component={Container} display={'flex'} flexDirection={'column'} gap={2} my={2}>
					<Box display={'flex'} justifyContent={'space-around'}>
						<BarCharTask tasks={tasks} users={users} />
					</Box>
					<Box display={'flex'} justifyContent={'space-around'}>
						<PieChartStatus tasks={tasks} />
					</Box>
				</Box>
			)}
		</>
	)
}

export default DashboardPage
