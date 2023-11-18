import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const LoaderComponent: React.FC = () => {
	return (
		<Box display={'flex'} justifyContent={'center'} my={5}>
			<CircularProgress color={'secondary'} size={'5rem'} />
		</Box>
	)
}

export default LoaderComponent
