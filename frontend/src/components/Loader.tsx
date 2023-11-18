import React from 'react'
import { CircularProgress } from '@mui/material'

const Loader: React.FC = () => {
	return (
		<>
			<CircularProgress color={'secondary'} size={'5rem'} className={'center'} />
		</>
	)
}

export default Loader
