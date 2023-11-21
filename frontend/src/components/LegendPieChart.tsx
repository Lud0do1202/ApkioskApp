import {Box, LinearProgress, Typography} from '@mui/material'
import React from 'react'

const LegendPieChart: React.FC<{
    color: string
    value: number
    total: number
    label: string
}> = ({color, value, total, label}) => {
    const calc = Math.floor((value / total) * 1000) / 10

    return (
        <Box color={color}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography color={"inherit"} variant="caption">
                    {label}
                </Typography>
                <Typography color={"inherit"} variant="caption">
                    {calc}%
                </Typography>
            </Box>
            <LinearProgress variant="determinate" color={"inherit"} value={calc} sx={{height: 5, borderRadius: 20}}/>
        </Box>
    )
}

export default LegendPieChart
