import {Box, colors, useTheme} from '@mui/material'
import {LineChart} from '@mui/x-charts'
import React from 'react'
import {Task} from '../models/Task'
import {User} from '../models/User'
import {TaskStatus} from '../models/TaskStatus'

const LineChartCompletedTasks: React.FC<{ tasks: Task[]; users: User[] }> = ({tasks, users}) => {
    const theme = useTheme()

    // Legends
    const legendMonths = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
    ]

    // Data
    const data = users.map((u) => {
        return {
            data: legendMonths.map(
                (_, indexMonth) =>
                    tasks.filter(
                        (t) =>
                            t.user?.id === u.id && t.status === TaskStatus.Completed && indexMonth === t.completedDate?.getMonth()
                    ).length
            ),
            label: `${u.lastname.substring(0, 1)} ${u.firstname}`,
        }
    })

    return (
        <Box
            width={'95%'}
            border={'3px solid ' + colors.grey[400]}
            borderRadius={2}
            display={'flex'}
            justifyContent={'center'}
            px={2}>
            <LineChart
                yAxis={[{label: 'Nombre de tâches'}]}
                xAxis={[{scaleType: 'point', data: legendMonths, label: 'Mois'}]}
                series={data}
                width={900}
                height={300}
                sx={{
                    shapeRendering: 'crispEdges',
                }}
            />
        </Box>
    )
}

export default LineChartCompletedTasks
