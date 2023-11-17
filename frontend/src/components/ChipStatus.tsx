import React from 'react'
import { TaskStatus } from '../models/TaskStatus'
import { Chip, lighten } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Interface of props for ChipStatus
interface ChipStatusProps {
	backgroundColor: string
	color: 'info' | 'error' | 'success'
	label: string
}

const ChipStatus: React.FC<{ status: TaskStatus }> = ({ status }) => {
	// Get the theme
	const theme = useTheme()

	// The level of the color that will be lighten
	const lighterLevel = 0.8

	// Set the props
	let props: ChipStatusProps
	switch (status) {
		// IN PROGRESS
		case TaskStatus.InProgress:
			props = { color: 'info', backgroundColor: lighten(theme.palette.info.main, lighterLevel), label: 'En cours' }
			break

		// BLOCKED
		case TaskStatus.Blocked:
			props = { color: 'error', backgroundColor: lighten(theme.palette.error.main, lighterLevel), label: 'Bloqué' }
			break

		// COMPLETED
		case TaskStatus.Completed:
			props = { color: 'success', backgroundColor: lighten(theme.palette.success.main, lighterLevel), label: 'Terminé' }
			break
	}

	return (
		<>
			<Chip
				variant={'outlined'}
				style={{ backgroundColor: props.backgroundColor }}
				label={props.label}
				color={props.color}
			/>
		</>
	)
}

export default ChipStatus
