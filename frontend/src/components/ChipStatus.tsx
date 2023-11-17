import React from 'react'
import { TaskStatus } from '../models/TaskStatus'
import { Chip, lighten } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const ChipStatus: React.FC<{ status: TaskStatus }> = ({ status }) => {
	const theme = useTheme()
	const lighterLevel = 0.8
	let backgroundColor: string
	let color: 'info' | 'error' | 'success'
	let label: string
	switch (status) {
		case TaskStatus.InProgress:
			color = 'info'
			backgroundColor = lighten(theme.palette.info.main, lighterLevel)
			label = 'En cours'
			break
		case TaskStatus.Blocked:
			color = 'error'
			backgroundColor = lighten(theme.palette.error.main, lighterLevel)
			label = 'Bloqué'
			break
		case TaskStatus.Completed:
			color = 'success'
			backgroundColor = lighten(theme.palette.success.main, lighterLevel)
			label = 'Terminé'
			break
	}
	return (
		<>
			<Chip variant={'outlined'} style={{ backgroundColor }} label={label} color={color} />
		</>
	)
}

export default ChipStatus
