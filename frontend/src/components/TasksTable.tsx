import React, {useEffect, useState} from 'react'
import {Box, Typography,} from '@mui/material'
import {Task} from '../models/Task'
import {TaskStatus} from '../models/TaskStatus'
import {User} from '../models/User'
import NoTasksAvailable from './NoTasksAvailable'
import TaskTableContainer from './TaskTableContainer'

const TasksTable: React.FC = () => {
    // MOCK USERS
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

    // MOCK TASKS
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
        {
            id: 4,
            label: 'Label 4',
            status: TaskStatus.InProgress,
            user: USERS[0],
        },
        {
            id: 5,
            label: 'Label 5',
            status: TaskStatus.Blocked,
            user: USERS[0],
        },
        {
            id: 6,
            label: 'Label 6',
            status: TaskStatus.Completed,
            user: USERS[1],
        },
        {
            id: 7,
            label: 'Label 7',
            status: TaskStatus.InProgress,
            user: USERS[1],
        },
        {
            id: 8,
            label: 'Label 8',
            status: TaskStatus.Blocked,
            user: USERS[0],
        },
        {
            id: 9,
            label: 'Label 9',
            status: TaskStatus.Completed,
            user: USERS[0],
        },
        {
            id: 10,
            label: 'Label 10',
            status: TaskStatus.InProgress,
            user: USERS[1],
        },
        {
            id: 11,
            label: 'Label 11',
            status: TaskStatus.Blocked,
            user: USERS[0],
        },
        {
            id: 12,
            label: 'Label 12',
            status: TaskStatus.Completed,
            user: USERS[0],
        },
        {
            id: 13,
            label: 'Label 13',
            status: TaskStatus.InProgress,
            user: USERS[1],
        },
        {
            id: 14,
            label: 'Label 14',
            status: TaskStatus.Blocked,
            user: USERS[0],
        },
        {
            id: 15,
            label: 'Label 15',
            status: TaskStatus.Completed,
            user: USERS[0],
        },
        {
            id: 16,
            label: 'Label 16',
            status: TaskStatus.InProgress,
            user: USERS[1],
        },
        {
            id: 17,
            label: 'Label 17',
            status: TaskStatus.Blocked,
            user: USERS[0],
        },
        {
            id: 18,
            label: 'Label 18',
            status: TaskStatus.Completed,
            user: USERS[0],
        },
        {
            id: 19,
            label: 'Label 19',
            status: TaskStatus.InProgress,
            user: USERS[1],
        },
        {
            id: 20,
            label: 'Label 20',
            status: TaskStatus.Blocked,
            user: USERS[0],
        },
    ]

    // The tasks
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined)

    // INIT just first loading
    useEffect(() => {
        // Simulate api request
        setTimeout(() => {
            setTasks(TASKS_MOCK)
        }, 1500)
    }, [])

    return (
        <Box mt={3} mx={5}>
            {tasks === undefined ? (
                <Typography>LOADING</Typography>
            ) : (
                <>{tasks.length === 0 ? <NoTasksAvailable/> :
                    <TaskTableContainer tasks={tasks}></TaskTableContainer>}</>
            )}
        </Box>
    )
}
export default TasksTable
