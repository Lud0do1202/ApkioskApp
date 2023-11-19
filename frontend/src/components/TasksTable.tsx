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
import FilterTasks from './FilterTasks'
import {TaskStatus} from '../models/TaskStatus'
import ExcelTasks from './ExcelTasks'

const TasksTable: React.FC = () => {
    // The tasks
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined)
    const [tasksUI, setTasksUI] = useState<Task[]>([])

    // INIT
    useEffect(() => {
        // Simulate api request
        setTimeout(() => {
            setTasks(TasksMock)
            setTasksUI(filterTasks(TasksMock))
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
        setTasksUI(filterTasks(newTasks, filterSearch, filterUserId, filterStatus))
    }

    // Filter
    const filterTasks = (tasks: Task[], label?: string, userId?: number, status?: TaskStatus) => {
        let tasksFiltered: Task[]

        // Search
        tasksFiltered = label === undefined ? tasks : tasks.filter((task) => task.label.includes(label))

        // UserId
        tasksFiltered =
            userId === undefined
                ? tasksFiltered
                : tasksFiltered.filter((task) => (userId === 0 && task.user === null) || task.user?.id === userId)

        // UserId
        tasksFiltered = status === undefined ? tasksFiltered : tasksFiltered.filter((task) => task.status === status)

        // Order
        tasksFiltered = tasksFiltered.sort((t1, t2) => t1.label.localeCompare(t2.label))

        return tasksFiltered
    }

    // Search bar
    const [filterSearch, setFilterSearch] = useState<string | undefined>(undefined)
    const handleSearchChange = (search: string) => {
        setFilterSearch(search)
        setTasksUI(filterTasks(tasks!, search, filterUserId, filterStatus))
    }

    // User + Status
    const [filterUserId, setFilterUserId] = useState<number | undefined>(undefined)
    const [filterStatus, setFilterStatus] = useState<number | undefined>(undefined)
    const handleFilterChange = (userId?: number, status?: TaskStatus) => {
        setFilterUserId(userId)
        setFilterStatus(status)
        setTasksUI(filterTasks(tasks!, filterSearch, userId, status))
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
                        <Box display={'flex'} gap={2}>
                            <SearchTasks handleSearchChange={handleSearchChange}/>
                            <ExcelTasks tasks={tasks}/>
                            <FilterTasks handleFilterChange={handleFilterChange}/>
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
