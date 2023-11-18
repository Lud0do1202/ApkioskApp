import React, {useState} from 'react'
import {Box, Button, Container, IconButton, Modal, Paper, Typography, useTheme} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {Task} from '../models/Task'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const DeleteTaskButton: React.FC<{ task: Task; deleteTask: (taskId: number) => void }> = ({task, deleteTask}) => {
    const theme = useTheme()

    // Modals var
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // delete tasks
    const handleDeleteTask = () => {
        deleteTask(task.id)
        handleClose()
    }

    return (
        <>
            <IconButton aria-label="delete" color="error" onClick={handleOpen}>
                <Delete/>
            </IconButton>

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
                                    onClick={handleDeleteTask}>
                                    Supprimer
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Modal>
        </>
    )
}

export default DeleteTaskButton