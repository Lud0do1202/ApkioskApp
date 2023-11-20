import React from 'react'
import {AppBar, Box, Link, Toolbar, Typography} from '@mui/material'

const Navbar: React.FC = () => {
    // Const of all links
    const dashboardLink = '/dashboard'
    const tasksLink = '/tasks'
    // The active link
    const activeLink = window.location.pathname

    /**
     * Set the color of the text of a link (if it's the active one -> set a color)
     * @param link One of the const link
     */
    function setColorLink(link: string): string {
        return activeLink === link || ('/' === activeLink && link === dashboardLink) ? 'secondary' : 'white'
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography color={'secondary'} variant="h4" component="div" sx={{flexGrow: 1}}>
                        <Box component={'span'} fontWeight={'bold'}>
                            ProTasker
                        </Box>
                    </Typography>
                    <Link href={dashboardLink} color={setColorLink(dashboardLink)} mx={2} underline={'none'}>
                        <Typography variant="h6" component="div">
                            Tableau de bord
                        </Typography>
                    </Link>
                    <Link href={tasksLink} color={setColorLink(tasksLink)} mx={2} underline={'none'}>
                        <Typography variant="h6" component="div">
                            Tâches
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Navbar
