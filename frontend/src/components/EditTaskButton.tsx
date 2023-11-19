import React, { useRef } from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Task } from '../models/Task'
import ModalEditTask from './ModalEditTask'
import { HandleOpenModalRef } from '../models/HandleOpenModalRef'
import { Consumer2 } from '../models/Consumer'
import { TaskEdit } from '../models/TaskEdit'
import { User } from '../models/User'

const EditTaskButton: React.FC<{ task: Task; handleUpdateTask: Consumer2<TaskEdit, User | null> }> = ({ task, handleUpdateTask }) => {
	const modalRef = useRef<HandleOpenModalRef>(null)

	return (
		<>
			<IconButton aria-label="edit" color="secondary" onClick={() => modalRef.current?.handleOpen()}>
				<Edit />
			</IconButton>

			<ModalEditTask ref={modalRef} task={task} handleUpdateTask={handleUpdateTask} />
		</>
	)
}

export default EditTaskButton
