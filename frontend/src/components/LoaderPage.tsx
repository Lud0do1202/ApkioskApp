import React from 'react'
import { CircularProgress } from '@mui/material'

const LoaderPage: React.FC = () => {
	return (
		<>
			<CircularProgress color={'secondary'} size={'5rem'} className={'center'} />
		</>
	)
}

export default LoaderPage
