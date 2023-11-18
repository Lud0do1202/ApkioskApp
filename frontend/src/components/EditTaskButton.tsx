import React, { useState } from 'react'
import {
	Box,
	Button,
	CircularProgress,
	Container,
	IconButton,
	MenuItem,
	Modal,
	Paper,
	TextField,
	Typography,
	colors,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Task } from '../models/Task'
import CloseIcon from '@mui/icons-material/Close'
import { User } from '../models/User'
import { USERS } from '../MOCK/UsersMock'
import { allTaskStatus } from '../models/TaskStatus'
import ChipStatus from './ChipStatus'
import Loader from './LoaderPage'
import LoaderComponent from './LoaderComponent'

const EditTaskButton: React.FC<{ task: Task; updateTask: (task: Task) => void }> = ({ task, updateTask }) => {
	// Users
	const [users, setUsers] = useState<User[] | undefined>(undefined)

	// Modals var
	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		setOpen(true)
		setTimeout(() => {
			setUsers(USERS)
		}, 500)
	}
	const handleClose = () => {
		setUsers(undefined)
		setOpen(false)
	}

	// Form
	const [label, setLabel] = useState(task.label)
	const [status, setStatus] = useState(task.status)
	const [userId, setUserId] = useState(task.user?.id || 0)

	// Submit
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		// Prevent default submit
		event.preventDefault()

		// Update the task
		task.label = label
		task.status = status
		task.user = users!.find((user) => user.id === userId) ?? null

		// Update the task for the table and the DB
		updateTask(task)

		// Close modal
		handleClose()
	}

	return (
		<>
			<IconButton aria-label="edit" color="secondary" onClick={handleOpen}>
				<Edit />
			</IconButton>

			<Modal open={open} onClose={handleClose}>
				<Container maxWidth={'sm'}>
					<Box p={2} component={Paper} elevation={12}>
						{users === undefined ? (
							<LoaderComponent />
						) : (
							<>
								{/* FORM */}
								<form onSubmit={handleSubmit}>
									{/* Header */}
									<Box
										display={'flex'}
										justifyContent={'space-between'}
										alignItems={'center'}
										pb={2}
										mb={4}
										sx={{ borderBottom: '3px solid ' + colors.grey[400] }}>
										<Typography variant="h6" color={'secondary'} fontWeight={'bold'}>
											Nouvelle tâche
										</Typography>
										<IconButton aria-label="delete" onClick={handleClose}>
											<CloseIcon fontSize="large" />
										</IconButton>
									</Box>

									{/* Body */}
									<Box display={'flex'} flexDirection={'column'} gap={3}>
										<TextField
											id="label"
											label="Libellé de la tâche"
											required
											defaultValue={label}
											onChange={(e) => setLabel(e.target.value)}
											size="small"
										/>

										<TextField
											id="attribution"
											select
											label="Attribution"
											defaultValue={task.user?.id ?? 0}
											size="small"
											onChange={(e) => setUserId(Number.parseInt(e.target.value))}>
											<MenuItem key={0} value={0}>
												No Attribution
											</MenuItem>
											{users?.map((user) => (
												<MenuItem key={user.id} value={user.id}>
													{user.lastname} {user.firstname}
												</MenuItem>
											))}
										</TextField>

										<TextField
											id="status"
											select
											label="Status"
											defaultValue={task.status}
											size="small"
											onChange={(e) => setStatus(Number.parseInt(e.target.value))}>
											{allTaskStatus.map((s) => (
												<MenuItem key={s} value={s}>
													<ChipStatus status={s} />
												</MenuItem>
											))}
										</TextField>
									</Box>

									{/* Footer */}
									<Box
										mt={4}
										pt={2}
										gap={2}
										display={'flex'}
										justifyContent={'end'}
										alignContent={'center'}
										color={colors.grey[500]}
										sx={{ borderTop: '3px solid ' + colors.grey[400] }}>
										<Button variant="text" color={'inherit'} onClick={handleClose}>
											Annuler
										</Button>
										<Button type="submit" variant="contained" color={'primary'}>
											Modifier
										</Button>
									</Box>
								</form>
							</>
						)}
					</Box>
				</Container>
			</Modal>
		</>
	)
}

export default EditTaskButton
