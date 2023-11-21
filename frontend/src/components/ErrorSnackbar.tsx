import React, {useState} from 'react'
import {Box, Snackbar, Typography, useTheme} from '@mui/material'
import {HandleOpenRef} from '../models/HandelOpenRef'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const ErrorSnackbar = React.forwardRef<HandleOpenRef, {}>((props, ref) => {
    const theme = useTheme()

    const [open, setOpen] = useState(false)
    // Open modal from parent
    React.useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true)
        },
    }))
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={handleClose}
            onClick={handleClose}>
            <Box
                width={300}
                height={100}
                display="flex"
                flexDirection={'column'}
                justifyContent="center"
                sx={{backgroundColor: theme.palette.error.main}}
                p={2}
                borderRadius={3}>
                <Box
                    pb={1}
                    display={'flex'}
                    alignItems={'center'}
                    gap={2}
                    component={Typography}
                    color={theme.palette.error.contrastText}
                    variant="h5">
                    <ReportProblemIcon fontSize="large" color="inherit"/> ERREUR
                </Box>
                <Box mb={1} width={'100%'} height={'2px'} sx={{backgroundColor: theme.palette.error.contrastText}}/>
                <Typography color={theme.palette.error.contrastText} variant="body2">
                    Une erreur est survenue.
                    <br/>
                    Veuillez réessayer ou rafraichir la page.
                </Typography>
            </Box>
        </Snackbar>
    )
})

export default ErrorSnackbar
