import React from 'react'
import {Box, Container, Typography} from '@mui/material'
import {grey} from '@mui/material/colors'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

const NoTasksAvailable: React.FC = () => {
    return (
        <Box
            position={'absolute'}
            width={'100%'}
            top={'50%'}
            left={'50%'}
            style={{transform: 'translate(-50%, -50%)'}}
            component={Container}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            color={grey[500]}>
            <FormatListBulletedIcon sx={{color: grey[500], fontSize: '4rem'}}/>
            <Typography fontSize={'2rem'} fontWeight={'bold'}>
                Aucune tâche disponible
            </Typography>
        </Box>
    )
}

export default NoTasksAvailable
