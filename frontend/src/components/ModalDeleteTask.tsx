import React, {useState} from 'react'
import {CrudTasks} from '../models/CrudTasks'
import {HandleOpenModalRef} from '../models/HandleOpenModalRef'
import {Task} from '../models/Task'
import {Box, Button, Container, Modal, Paper, Typography, useTheme} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const ModalDeleteTask = React.forwardRef<HandleOpenModalRef, { task: Task; crudTasks: CrudTasks }>((props, ref) => {
    // Open modal from parent
    React.useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true)
        },
    }))

    // Get props
    const {task, crudTasks} = props

    // Get theme
    const theme = useTheme()

    // Modals var
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)

    // Delete tasks
    const deleteTask = () => {
        crudTasks('delete', task)
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Container maxWidth={'sm'}>
                <Box p={3} component={Paper} elevation={12}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        fontSize={'4rem'}>
                        <WarningAmberIcon color="warning" fontSize="inherit"/>
                        <Typography variant="h6" color={theme.palette.warning.main}>
                            Supression d'une tâche
                        </Typography>
                        <Box mt={3} component={Typography} align="center" variant="body1">
                            Vous êtes sur le point de supprimer une tâche. <br/>
                            Êtes-vous sûr de vouloir procéder à la suppression ?
                        </Box>
                        <Box mt={4} width={'100%'} display={'flex'} justifyContent={'center'} gap={3}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.grey[400],
                                    '&:hover': {
                                        backgroundColor: theme.palette.grey[700],
                                    },
                                }}
                                onClick={handleClose}>
                                Annuler
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{backgroundColor: theme.palette.error.light}}
                                onClick={deleteTask}>
                                Supprimer
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Modal>
    )
})

export default ModalDeleteTask
