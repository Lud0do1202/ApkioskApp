import React, {useState} from 'react'
import {Box, Container, IconButton, Modal, Paper, Typography} from '@mui/material'
import {User} from '../models/User'
import {Edit} from '@mui/icons-material'

const EditTaskButton: React.FC<{ user: User }> = ({user}) => {
    // Modals var
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <IconButton aria-label="edit" color="secondary" onClick={handleOpen}>
                <Edit/>
            </IconButton>

            <Modal open={open} onClose={handleClose}>
                <Container maxWidth={'sm'}>
                    <Box p={2} component={Paper} elevation={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            EDIT {user.id} {user.lastname} {user.firstname}
                        </Typography>
                    </Box>
                </Container>
            </Modal>
        </>
    )
}

export default EditTaskButton
