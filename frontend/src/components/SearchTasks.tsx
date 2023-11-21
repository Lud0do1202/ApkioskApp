import React from 'react'
import {InputAdornment, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchTasks: React.FC<{ handleSearchChange: (value: string) => void }> = ({handleSearchChange}) => {
    return (
        <>
            <TextField
                id="search"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                size="small"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                    },
                }}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
        </>
    )
}

export default SearchTasks
