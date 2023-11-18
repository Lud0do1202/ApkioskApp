import React, {useEffect, useState} from 'react'
import {Box} from '@mui/material'
import {Task} from '../models/Task'
import NoTasksAvailable from './NoTasksAvailable'
import TaskTableContainer from './TaskTableContainer'
import Loader from './LoaderPage'
import {TasksMock} from '../MOCK/TasksMock'
import {CrudTasks} from '../models/CrudTasks'
import AddTaskButton from './AddTaskButton'

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

    // Crud tasks
    const crudTask: CrudTasks = (type, task) => {
        switch (type) {
            case 'create':
                setTasks((prevTasks) => prevTasks?.concat(task))
                break
            case 'update':
                setTasks((prevTasks) => prevTasks?.map((prevTask) => (prevTask.id === task.id ? task : prevTask)))
                break
            case 'delete':
                setTasks((prevTasks) => prevTasks?.filter((prevTask) => prevTask.id !== task.id))
                break
            default:
                console.error('Method CRUD not allowed')
        }
    }

    return (
        <Box mt={3} mx={5}>
            {tasks === undefined ? (
                <Loader/>
            ) : (
                <>
                    {/* Top bar of table */}
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <AddTaskButton task={undefined} crudTasks={crudTask}/>
                    </Box>

                    {/* Table */}
                    {tasks.length === 0 ? (
                        <NoTasksAvailable/>
                    ) : (
                        <TaskTableContainer tasks={tasks} crudTasks={crudTask}></TaskTableContainer>
                    )}
                </>
            )}
        </Box>
    )
}
export default TasksTable
