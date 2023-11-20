import { Box, colors, useTheme } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import React from 'react'
import { Task } from '../models/Task'
import { User } from '../models/User'
import { TaskStatus } from '../models/TaskStatus'

const BarCharTask: React.FC<{ tasks: Task[], users: User[] }> = ({ tasks, users }) => {
	const theme = useTheme()

    // Legends
    const legendUsers = users.map(u => `${u.lastname} ${u.firstname}`)

    // Data
    const data = users.map(u => tasks.filter(t => t.user?.id === u.id && t.status === TaskStatus.Completed).length)

	return (
		<Box
			width={'90%'}
			border={'3px solid ' + colors.grey[400]}
			borderRadius={2}
            display={"flex"}
            justifyContent={"center"}
			py={2}
			px={2}>
			<BarChart
				xAxis={[{ scaleType: 'band', data: legendUsers }]}
				series={[{ data: data }]}
                colors={[theme.palette.success.main]}
				width={750}
				height={300}
			/>
		</Box>
	)
}

export default BarCharTask
