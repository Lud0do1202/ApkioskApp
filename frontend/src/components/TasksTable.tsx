import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Task } from '../models/Task'
import NoTasksAvailable from './NoTasksAvailable'
import TaskTableContainer from './TaskTableContainer'
import Loader from './LoaderPage'
import { TasksMock } from '../MOCK/TasksMock'

const TasksTable: React.FC = () => {
	// The tasks
	const [tasks, setTasks] = useState<Task[] | undefined>(undefined)

	// INIT
	useEffect(() => {
		// Simulate api request
		setTimeout(() => {
			setTasks(TasksMock)
		}, 1500)
	}, [])

	// Edit a task
	const editTask = (editedTask: Task) => {
		setTasks((prev) => prev?.map((task) => (task.id === editedTask.id ? editedTask : task)))
	}

	// Delete a task
	const deleteTask = (taskId: number) => {
		setTasks((prevTasks) => prevTasks?.filter((task) => task.id !== taskId))
	}

	return (
		<Box mt={3} mx={5}>
			{tasks === undefined ? (
				<Loader />
			) : (
				<>
					{tasks.length === 0 ? (
						<NoTasksAvailable />
					) : (
						<TaskTableContainer tasks={tasks} editTask={editTask} deleteTask={deleteTask}></TaskTableContainer>
					)}
				</>
			)}
		</Box>
	)
}
export default TasksTable
