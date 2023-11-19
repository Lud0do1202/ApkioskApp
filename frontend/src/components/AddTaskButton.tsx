import React, {useRef} from 'react'
import {Button} from '@mui/material'
import {Task} from '../models/Task'
import {CrudTasks} from '../models/CrudTasks'
import {HandleOpenModalRef} from '../models/HandleOpenModalRef'
import ModalEditTask from './ModalEditTask'

const AddTaskButton: React.FC<{ task: Task | undefined; crudTasks: CrudTasks }> = ({task, crudTasks}) => {
    const modalRef = useRef<HandleOpenModalRef>(null)

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => modalRef.current?.handleOpen()}>
                Ajouter une tâche
            </Button>

            <ModalEditTask ref={modalRef} task={task} crudTasks={crudTasks}/>
        </>
    )
}

export default AddTaskButton
