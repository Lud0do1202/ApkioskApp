import React, { useRef, useState } from 'react'
import { Box, Button, Container, IconButton, Modal, Paper, Typography, useTheme } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Task } from '../models/Task'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { CrudTasks } from '../models/CrudTasks'
import { HandleOpenModalRef } from '../models/HandleOpenModalRef'
import ModalDeleteTask from './ModalDeleteTask'

const DeleteTaskButton: React.FC<{ task: Task; crudTasks: CrudTasks }> = ({ task, crudTasks }) => {
	const modalRef = useRef<HandleOpenModalRef>(null)

	return (
		<>
			<IconButton aria-label="delete" color="error" onClick={() => modalRef.current?.handleOpen()}>
				<Delete />
			</IconButton>

			<ModalDeleteTask ref={modalRef} task={task} crudTasks={crudTasks} />
		</>
	)
}

export default DeleteTaskButton
