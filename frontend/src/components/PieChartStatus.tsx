import {Box, colors, useTheme} from '@mui/material'
import {PieChart} from '@mui/x-charts'
import React from 'react'
import LegendPieChart from './LegendPieChart'
import {Task} from '../models/Task'
import {TaskStatus} from '../models/TaskStatus'

const PieChartStatus: React.FC<{ tasks: Task[] }> = ({tasks}) => {
    const theme = useTheme()

    // Values
    const nbTasksTot = tasks.length
    const nbTasksBlocked = tasks.filter((t) => t.status === TaskStatus.Blocked).length
    const nbTasksInProgress = tasks.filter((t) => t.status === TaskStatus.InProgress).length
    const nbTasksCompleted = tasks.filter((t) => t.status === TaskStatus.Completed).length

    return (
        <Box
            className="hide-default-labels-chart"
            width={'45%'}
            border={'3px solid ' + colors.grey[400]}
            borderRadius={2}
            display={'flex'}
            justifyContent={'space-around'}
            alignItems={'center'}
            p={2}>
            <PieChart
                colors={[theme.palette.error.main, theme.palette.info.main, theme.palette.success.main]}
                series={[
                    {
                        data: [
                            {id: 0, value: nbTasksBlocked, label: 'Bloqué'},
                            {id: 1, value: nbTasksInProgress, label: 'En cours'},
                            {id: 2, value: nbTasksCompleted, label: 'Terminé'},
                        ],
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 3,
                        startAngle: 90,
                        endAngle: 450,
                    },
                ]}
                width={300}
                height={200}
            />

            <Box display={'flex'} flexDirection={'column'} width={'40%'} gap={3}>
                <LegendPieChart color={theme.palette.error.main} label="Bloqué" value={nbTasksBlocked}
                                total={nbTasksTot}/>
                <LegendPieChart color={theme.palette.info.main} label="En cours" value={nbTasksInProgress}
                                total={nbTasksTot}/>
                <LegendPieChart
                    color={theme.palette.success.main}
                    label="Terminé"
                    value={nbTasksCompleted}
                    total={nbTasksTot}
                />
            </Box>
        </Box>
    )
}

export default PieChartStatus
