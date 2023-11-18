import React, { useRef, useState } from 'react'
import { Box, Button, Container, IconButton, Modal, Paper, Typography, useTheme } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Task } from '../models/Task'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { CrudTasks } from '../models/CrudTasks'
import { HandleOpenModalRef } from '../models/HandleOpenModalRef'
import ModalDeleteTask from './ModalDeleteTask'
import ModalEditTask from './ModalEditTask'

const AddTaskButton: React.FC<{ task: Task | undefined; crudTasks: CrudTasks }> = ({ task, crudTasks }) => {
	const modalRef = useRef<HandleOpenModalRef>(null)

	return (
		<>
			<Button variant="contained" color="primary" onClick={() => modalRef.current?.handleOpen()}>
				Ajouter une tâche
			</Button>

			<ModalEditTask ref={modalRef} task={task} crudTasks={crudTasks} />
		</>
	)
}

export default AddTaskButton
