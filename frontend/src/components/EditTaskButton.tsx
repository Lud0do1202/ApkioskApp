import React, { useState } from 'react'
import { Box, Button, colors, Container, IconButton, MenuItem, Modal, Paper, TextField } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Task } from '../models/Task'
import { User } from '../models/User'
import { USERS } from '../MOCK/UsersMock'
import { allTaskStatus, TaskStatus } from '../models/TaskStatus'
import ChipStatus from './ChipStatus'
import LoaderComponent from './LoaderComponent'
import ModalHeader from './ModalHeader'

const EditTaskButton: React.FC<{ task: Task | undefined; editTask: (task: Task) => void }> = ({ task, editTask }) => {
	// Users
	const [users, setUsers] = useState<User[] | undefined>(undefined)

	// Modals var
	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		// Open modal
		setOpen(true)

		// Fetch users
		setTimeout(() => {
			setUsers(USERS)
		}, 500)
	}
	const handleClose = () => {
		// Reset all users (save memory)
		setUsers(undefined)

		// Reset form
		setLabel(task?.label)
		setStatus(task?.status)
		setUserId(task?.user?.id)

		setErrorLabel(false)
		setErrorLabelHelper(undefined)
		setErrorStatus(false)
		setErrorStatusHelper(undefined)

		// Close modal
		setOpen(false)
	}

	// Form
	const [label, setLabel] = useState<string | undefined>(task?.label)
	const [status, setStatus] = useState<TaskStatus | undefined>(task?.status)
	const [userId, setUserId] = useState<number | undefined>(task?.user?.id)

	const [errorLabel, setErrorLabel] = useState(false)
	const [errorLabelHelper, setErrorLabelHelper] = useState<string | undefined>(undefined)
	const [errorStatus, setErrorStatus] = useState(false)
	const [errorStatusHelper, setErrorStatusHelper] = useState<string | undefined>(undefined)

	// Submit
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		// Prevent default submit event
		event.preventDefault()

		// Check label
		if (label === undefined || label.trim() === '') {
			setErrorLabel(true)
			setErrorLabelHelper('Champ obligatoire')
		} else if (label.length > 255) {
			setErrorLabel(true)
			setErrorLabelHelper('Max 255 caractères')
		} else {
			setErrorLabel(false)
			setErrorLabelHelper(undefined)
		}

		// Check status
		if (status === undefined) {
			setErrorStatus(true)
			setErrorStatusHelper('Champ obligatoire')
		} else {
			setErrorStatus(false)
			setErrorStatusHelper(undefined)
		}

		// STOP if error
		if (!errorLabel || !errorStatus) return

		// Update the task
		const editedTask: Task = {
			id: userId ?? 0,
			label: label!,
			status: status!,
			user: users!.find((user) => user.id === userId) ?? null,
		}

		// Update the task for the table and the DB
		editTask(editedTask)

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
								<form onSubmit={handleSubmit} noValidate>
									{/* Header */}
									<ModalHeader text="Modification d'une tâche" handleClose={handleClose} />

									{/* Body */}
									<Box display={'flex'} flexDirection={'column'} gap={3}>
										<TextField
											id="label"
											error={errorLabel}
											helperText={errorLabelHelper}
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
											defaultValue={userId}
											size="small"
											onChange={(e) => setUserId(Number.parseInt(e.target.value))}>
											<MenuItem key={0} value={undefined}>
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
											error={errorStatus}
											helperText={errorStatusHelper}
											label="Status"
											required
											defaultValue={task?.status}
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
