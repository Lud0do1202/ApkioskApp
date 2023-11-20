import React, {useRef} from 'react'
import {Button} from '@mui/material'
import ModalEditTask from './ModalEditTask'
import {Consumer} from '../models/Consumer'
import {TaskEdit} from '../models/TaskEdit'
import {HandleOpenRef} from '../models/HandelOpenRef'

const AddTaskButton: React.FC<{ handleCreateTask: Consumer<TaskEdit> }> = ({handleCreateTask}) => {
    const modalRef = useRef<HandleOpenRef>(null)

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => modalRef.current?.handleOpen()}>
                Ajouter une tâche
            </Button>

            <ModalEditTask ref={modalRef} task={undefined} handleCreateTask={handleCreateTask}/>
        </>
    )
}

export default AddTaskButton
