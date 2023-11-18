import React, { useState } from 'react'
import {
	Box,
	Button,
	colors,
	Container,
	IconButton,
	MenuItem,
	Modal,
	Paper,
	TextField,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Task } from '../models/Task'
import { User } from '../models/User'
import { USERS } from '../MOCK/UsersMock'
import { allTaskStatus } from '../models/TaskStatus'
import ChipStatus from './ChipStatus'
import LoaderComponent from './LoaderComponent'
import ModalHeader from './ModalHeader'

const EditTaskButton: React.FC<{ task: Task; editTask: (task: Task) => void }> = ({ task, editTask }) => {
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
		editTask(task)

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
									<ModalHeader text='Nouvelle Tâche' handleClose={handleClose} />

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
