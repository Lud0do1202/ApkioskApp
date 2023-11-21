import React, {useRef} from 'react'
import {IconButton} from '@mui/material'
import {Edit} from '@mui/icons-material'
import {Task} from '../models/Task'
import ModalEditTask from './ModalEditTask'
import {Consumer} from '../models/Consumer'
import {TaskEdit} from '../models/TaskEdit'
import {HandleOpenRef} from '../models/HandelOpenRef'

const EditTaskButton: React.FC<{ task: Task; handleUpdateTask: Consumer<TaskEdit> }> = ({task, handleUpdateTask}) => {
    const modalRef = useRef<HandleOpenRef>(null)

    return (
        <>
            <IconButton aria-label="edit" color="secondary" onClick={() => modalRef.current?.handleOpen()}>
                <Edit/>
            </IconButton>

            <ModalEditTask ref={modalRef} task={task} handleUpdateTask={handleUpdateTask}/>
        </>
    )
}

export default EditTaskButton
