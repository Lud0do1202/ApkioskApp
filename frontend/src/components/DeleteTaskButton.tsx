import React, { useRef } from 'react'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { HandleOpenModalRef } from '../models/HandleOpenModalRef'
import ModalDeleteTask from './ModalDeleteTask'
import { Consumer } from '../models/Consumer'

const DeleteTaskButton: React.FC<{ taskId: number; handleDeleteTask: Consumer<number> }> = ({
	taskId,
	handleDeleteTask,
}) => {
	const modalRef = useRef<HandleOpenModalRef>(null)

	return (
		<>
			<IconButton aria-label="delete" color="error" onClick={() => modalRef.current?.handleOpen()}>
				<Delete />
			</IconButton>

			<ModalDeleteTask ref={modalRef} taskId={taskId} handleDeleteTask={handleDeleteTask} />
		</>
	)
}

export default DeleteTaskButton
