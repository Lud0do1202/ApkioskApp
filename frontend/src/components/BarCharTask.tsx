import {Box, colors, useTheme} from '@mui/material'
import {BarChart} from '@mui/x-charts'
import React from 'react'
import {Task} from '../models/Task'
import {User} from '../models/User'
import {TaskStatus} from '../models/TaskStatus'

const BarCharTask: React.FC<{ tasks: Task[], users: User[] }> = ({tasks, users}) => {
    const theme = useTheme()

    // Legends
    const legendUsers = users.map(u => `${u.lastname.substring(0, 1)} ${u.firstname}`)

    // Data
    const data = users.map(u => tasks.filter(t => t.user?.id === u.id && t.status === TaskStatus.Completed).length)

    return (
        <Box
            width={'45%'}
            border={'3px solid ' + colors.grey[400]}
            borderRadius={2}
            display={"flex"}
            justifyContent={"center"}
            p={2}>
            <BarChart
                xAxis={[{scaleType: 'band', data: legendUsers}]}
                series={[{data: data}]}
                colors={[theme.palette.success.main]}
                width={500}
                height={300}
            />
        </Box>
    )
}

export default BarCharTask
