import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PieChartStatus from '../components/PieChartStatus'
import { Task } from '../models/Task'
import LoaderPage from '../components/LoaderPage'

const DashboardPage: React.FC = () => {
	// Fetch tasks
	const [tasks, setTasks] = useState<Task[] | undefined>(undefined)
	useEffect(() => {
		fetch('https://localhost:7278/api/Tasks', { method: 'GET' })
			.then((res) => res.json())
			.then((tasksApi: Task[]) => setTasks(tasksApi))
			.catch((e) => console.error(e))
	}, [])

	return (
		<>
			{tasks === undefined ? (
				<LoaderPage />
			) : (
				<Box display={"flex"} justifyContent={"space-around"}>
					<PieChartStatus tasks={tasks} />
				</Box>
			)}
		</>
	)
}

export default DashboardPage
