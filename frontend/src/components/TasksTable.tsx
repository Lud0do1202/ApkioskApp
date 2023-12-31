import React, {useEffect, useRef, useState} from 'react'
import {Box} from '@mui/material'
import {Task} from '../models/Task'
import NoTasksAvailable from './NoTasksAvailable'
import TaskTableContainer from './TaskTableContainer'
import Loader from './LoaderPage'
import AddTaskButton from './AddTaskButton'
import SearchTasks from './SearchTasks'
import FilterTasks from './FilterTasks'
import {TaskStatus} from '../models/TaskStatus'
import ExcelTasks from './ExcelTasks'
import {TaskEdit} from '../models/TaskEdit'
import {Consumer} from '../models/Consumer'
import {HandleOpenRef} from '../models/HandelOpenRef'
import ErrorSnackbar from './ErrorSnackbar'

const TasksTable: React.FC = () => {
    // The tasks
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined)
    const [tasksUI, setTasksUI] = useState<Task[]>([])

    // Ref Error snackbar
    const errorSnackbarRef = useRef<HandleOpenRef>(null)

    // INIT
    useEffect(() => {
        fetch('https://localhost:7278/api/Tasks', {method: 'GET'})
            .then((res) => res.json())
            .then((tasksApi: Task[]) => {
                setTasks(tasksApi)
                setTasksUI(filterTasks(tasksApi))
            })
            .catch(_ => errorSnackbarRef.current?.handleOpen())
    }, [])

    // Create task
    const handleCreateTask: Consumer<TaskEdit> = (taskEdit) => {
        fetch('https://localhost:7278/api/Tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskEdit),
        })
            .then((res) => res.json())
            .then((tasksInserted: Task) => {
                // Set the date
                tasksInserted.completedDate =
                    tasksInserted.completedDate === null ? null : new Date(tasksInserted.completedDate)
                // Create the new array
                const newTasksArray = tasks!.concat(tasksInserted)
                // Set it
                setTasks(newTasksArray)
                setTasksUI(filterTasks(newTasksArray, filterSearch, filterUserId, filterStatus))
            })
            .catch(_ => errorSnackbarRef.current?.handleOpen())
    }

    // Update task
    const handleUpdateTask: Consumer<TaskEdit> = (taskEdit) => {
        fetch(`https://localhost:7278/api/Tasks/${taskEdit.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskEdit),
        })
            .then((res) => res.json())
            .then((taskUpdated: Task) => {
                // Set the date
                taskUpdated.completedDate = taskUpdated.completedDate === null ? null : new Date(taskUpdated.completedDate)
                // Create the new array
                const newTasksArray = tasks!.map((task) => (task.id === taskUpdated.id ? taskUpdated : task))
                // Set it
                setTasks(newTasksArray)
                setTasksUI(filterTasks(newTasksArray, filterSearch, filterUserId, filterStatus))
            })
            .catch(_ => errorSnackbarRef.current?.handleOpen())
    }

    // Delete task
    const handleDeleteTask: Consumer<number> = (taskId) => {
        fetch(`https://localhost:7278/api/Tasks/${taskId}`, {method: 'DELETE'})
            .then(() => {
                const newTasksArray = tasks!.filter((task) => task.id !== taskId)
                setTasks(newTasksArray)
                setTasksUI(filterTasks(newTasksArray, filterSearch, filterUserId, filterStatus))
            })
            .catch(_ => errorSnackbarRef.current?.handleOpen())
    }

    // Filter
    const filterTasks = (tasks: Task[], label?: string, userId?: number, status?: TaskStatus) => {
        let tasksFiltered: Task[]

        // Search
        tasksFiltered = label === undefined ? tasks : tasks.filter((task) => task.label.toLowerCase().includes(label.toLowerCase()))

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
            <ErrorSnackbar ref={errorSnackbarRef}/>
            {tasks === undefined ? (
                <Loader/>
            ) : (
                <>
                    {/* Top bar of table */}
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <AddTaskButton handleCreateTask={handleCreateTask}/>
                        <Box display={'flex'} gap={2}>
                            <SearchTasks handleSearchChange={handleSearchChange}/>
                            <ExcelTasks search={filterSearch} status={filterStatus} userId={filterUserId}/>
                            <FilterTasks handleFilterChange={handleFilterChange}/>
                        </Box>
                    </Box>

                    {/* Table */}
                    {tasks.length === 0 ? (
                        <NoTasksAvailable/>
                    ) : (
                        <TaskTableContainer
                            tasks={tasksUI}
                            handleUpdateTask={handleUpdateTask}
                            handleDeleteTask={handleDeleteTask}
                        />
                    )}
                </>
            )}
        </Box>
    )
}
export default TasksTable
