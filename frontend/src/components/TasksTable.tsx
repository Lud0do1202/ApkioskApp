import React, {useEffect, useState} from 'react'
import {Box} from '@mui/material'
import {Task} from '../models/Task'
import NoTasksAvailable from './NoTasksAvailable'
import TaskTableContainer from './TaskTableContainer'
import Loader from './LoaderPage'
import {TasksMock} from '../MOCK/TasksMock'
import {CrudTasks} from '../models/CrudTasks'
import AddTaskButton from './AddTaskButton'
import SearchTasks from './SearchTasks'

const TasksTable: React.FC = () => {
    // The tasks
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined)
    const [tasksUI, setTasksUI] = useState<Task[]>([])

    // INIT
    useEffect(() => {
        // Simulate api request
        setTimeout(() => {
            setTasks(TasksMock)
            setTasksUI(filterTasks(TasksMock, ''))
        }, 100)
    }, [])

    // Crud tasks
    const crudTask: CrudTasks = (type, task) => {
        let newTasks: Task[] = []
        switch (type) {
            case 'create':
                newTasks = tasks!.concat(task)
                break
            case 'update':
                newTasks = tasks!.map((t) => (t.id === task.id ? task : t))
                break
            case 'delete':
                newTasks = tasks!.filter((t) => t.id !== task.id)
                break
            default:
                throw new Error('Method CRUD not allowed')
        }
        setTasks(newTasks)
        setTasksUI(filterTasks(newTasks, search))
    }

    // Filter
    const filterTasks = (tasks: Task[], label: string) => {
        return tasks.filter((task) => task.label.includes(label)).sort((t1, t2) => t1.label.localeCompare(t2.label))
    }

    // Search bar
    const [search, setSearch] = useState('')
    const handleSearchChange = (value: string) => {
        setSearch(value)
        setTasksUI(filterTasks(tasks!, value))
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
                        <Box>
                            <SearchTasks handleSearchChange={handleSearchChange}/>
                        </Box>
                    </Box>

                    {/* Table */}
                    {tasks.length === 0 ? (
                        <NoTasksAvailable/>
                    ) : (
                        <TaskTableContainer tasks={tasksUI} crudTasks={crudTask}></TaskTableContainer>
                    )}
                </>
            )}
        </Box>
    )
}
export default TasksTable
