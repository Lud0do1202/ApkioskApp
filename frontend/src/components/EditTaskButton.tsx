import React, { useRef } from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Task } from '../models/Task'
import ModalEditTask from './ModalEditTask'
import { CrudTasks } from '../models/CrudTasks'
import { HandleOpenModalRef } from '../models/HandleOpenModalRef'

const EditTaskButton: React.FC<{ task: Task | undefined; crudTasks: CrudTasks }> = ({ task, crudTasks }) => {
	const modalRef = useRef<HandleOpenModalRef>(null)

	return (
		<>
			<IconButton aria-label="edit" color="secondary" onClick={() => modalRef.current?.handleOpen()}>
				<Edit />
			</IconButton>

			<ModalEditTask ref={modalRef} task={task} crudTasks={crudTasks} />
		</>
	)
}

export default EditTaskButton
