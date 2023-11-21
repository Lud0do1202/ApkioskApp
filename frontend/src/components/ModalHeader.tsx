import React from 'react'
import {Box, colors, IconButton, Typography} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ModalHeader: React.FC<{ text: string; handleClose: () => void }> = ({text, handleClose}) => {
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            pb={2}
            mb={4}
            sx={{borderBottom: '3px solid ' + colors.grey[400]}}>
            <Typography variant="h6" color={'secondary'} fontWeight={'bold'}>
                {text}
            </Typography>
            <IconButton aria-label="delete" onClick={handleClose}>
                <CloseIcon fontSize="large"/>
            </IconButton>
        </Box>
    )
}

export default ModalHeader
