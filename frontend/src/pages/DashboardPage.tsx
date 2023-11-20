import {Box, Container} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import PieChartStatus from '../components/PieChartStatus'
import {Task} from '../models/Task'
import LoaderPage from '../components/LoaderPage'
import BarCharTask from '../components/BarCharTask'
import {User} from '../models/User'
import LineChartCompletedTasks from '../components/LineChartCompletedTasks'
import NoTasksAvailable from '../components/NoTasksAvailable'
import ErrorSnackbar from '../components/ErrorSnackbar'
import {HandleOpenRef} from '../models/HandelOpenRef'

const DashboardPage: React.FC = () => {
    // Fetch tasks
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined)
    useEffect(() => {
        fetch('https://localhost:7278/api/Tasks', {method: 'GET'})
            .then((res) => res.json())
            .then((tasksApi: Task[]) => {
                setTasks(
                    tasksApi.map((t) => {
                        t.completedDate = t.completedDate === null ? null : new Date(t.completedDate)
                        return t
                    })
                )
            })
            .catch((_) => errorSnackbarRef.current?.handleOpen())
    }, [])

    // Fetch users
    const [users, setUsers] = useState<User[] | undefined>(undefined)
    useEffect(() => {
        fetch('https://localhost:7278/api/Users', {method: 'GET'})
            .then((res) => res.json())
            .then((usersApi: User[]) => setUsers(usersApi))
            .catch((_) => errorSnackbarRef.current?.handleOpen())
    }, [])

    // Ref Error snackbar
    const errorSnackbarRef = useRef<HandleOpenRef>(null)

    return (
        <>
            <ErrorSnackbar ref={errorSnackbarRef}/>
            {tasks === undefined || users === undefined ? (
                <LoaderPage/>
            ) : (
                <>
                    {tasks.length === 0 ? (
                        <NoTasksAvailable/>
                    ) : (
                        <Box component={Container} display={'flex'} flexDirection={'column'} gap={2} my={2}>
                            <Box display={'flex'} justifyContent={'space-around'}>
                                <LineChartCompletedTasks tasks={tasks} users={users}/>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-around'}>
                                <PieChartStatus tasks={tasks}/>
                                <BarCharTask tasks={tasks} users={users}/>
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </>
    )
}

export default DashboardPage
