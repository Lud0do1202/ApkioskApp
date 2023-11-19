import React, { useRef } from 'react'
import { Button } from '@mui/material'
import { HandleOpenModalRef } from '../models/HandleOpenModalRef'
import ModalEditTask from './ModalEditTask'
import { Consumer } from '../models/Consumer'
import { TaskEdit } from '../models/TaskEdit'

const AddTaskButton: React.FC<{ handleCreateTask: Consumer<TaskEdit> }> = ({ handleCreateTask }) => {
	const modalRef = useRef<HandleOpenModalRef>(null)

	return (
		<>
			<Button variant="contained" color="primary" onClick={() => modalRef.current?.handleOpen()}>
				Ajouter une tâche
			</Button>

			<ModalEditTask ref={modalRef} task={undefined} handleCreateTask={handleCreateTask} />
		</>
	)
}

export default AddTaskButton
