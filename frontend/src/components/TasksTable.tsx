import React, {useEffect, useState} from 'react'
import {Box} from '@mui/material'
import {Task} from '../models/Task'
import NoTasksAvailable from './NoTasksAvailable'
import TaskTableContainer from './TaskTableContainer'
import Loader from './LoaderPage'
import {TasksMock} from '../MOCK/TasksMock'

const TasksTable: React.FC = () => {
    // The tasks
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined)

    // INIT
    useEffect(() => {
        // Simulate api request
        setTimeout(() => {
            setTasks(TasksMock)
        }, 1500)
    })

    const updateTask = (editedTask: Task) => {
        setTasks((prevTasks) => {
            return prevTasks?.map((task) => (task.id === editedTask.id ? editedTask : task))
        })
    }

    return (
        <Box mt={3} mx={5}>
            {tasks === undefined ? (
                <Loader/>
            ) : (
                <>
                    {tasks.length === 0 ? (
                        <NoTasksAvailable/>
                    ) : (
                        <TaskTableContainer tasks={tasks} updateTask={updateTask}></TaskTableContainer>
                    )}
                </>
            )}
        </Box>
    )
}
export default TasksTable
