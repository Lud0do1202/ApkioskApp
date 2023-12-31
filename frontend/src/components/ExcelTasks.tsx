import React, {useRef} from 'react'
import {Box, colors, createSvgIcon, IconButton, Popover} from '@mui/material'
import {TaskStatus} from '../models/TaskStatus'
import LoaderComponent from './LoaderComponent'
import {HandleOpenRef} from '../models/HandelOpenRef'
import ErrorSnackbar from './ErrorSnackbar'

const ExcelTasks: React.FC<{ search?: string; status?: TaskStatus; userId?: number }> = ({
                                                                                             search,
                                                                                             status,
                                                                                             userId,
                                                                                         }) => {
    // Ref Error snackbar
    const errorSnackbarRef = useRef<HandleOpenRef>(null)

    // Anchors
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    // Click excel
    const handleExcel = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Open popover
        setAnchorEl(event.currentTarget)

        // Build the url
        let url = 'https://localhost:7278/api/Tasks/Excel'
        if (search ?? status ?? userId) {
            url += '?'
            if (search) url += `search=${search}&`
            if (status) url += `status=${status}&`
            if (userId) url += `userId=${userId}&`
            url = url.substring(0, url.length - 1)
        }

        // Fetch and download the excel
        fetch(url, {method: 'GET'})
            .then((res) => res.blob())
            .then((blob) => {
                // Download excel file
                const url = window.URL.createObjectURL(new Blob([blob]))
                const a = document.createElement('a')
                a.href = url
                a.download = 'protasker.xlsx'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)

                // close popover
                setAnchorEl(null)
            })
            .catch((_) => errorSnackbarRef.current?.handleOpen())
    }

    // SVG Icon
    const ExcelIcon = createSvgIcon(
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path
                    d="M2665 4948 c-27 -5 -615 -115 -1305 -244 -1342 -251 -1296 -241
-1337 -309 -17 -29 -18 -98 -18 -1835 0 -1737 1 -1806 18 -1835 42 -69 -10
-57 1388 -319 1001 -188 1313 -243 1340 -237 48 11 77 31 102 71 22 35 22 38
25 618 l3 582 237 0 c130 0 255 5 276 10 80 18 134 105 116 187 -11 48 -66
102 -116 113 -21 5 -146 10 -276 10 l-238 0 0 160 0 160 238 0 c130 0 255 5
276 10 80 18 134 105 116 187 -11 48 -66 102 -116 113 -21 5 -146 10 -276 10
l-238 0 0 160 0 160 238 0 c130 0 255 5 276 10 50 11 105 65 116 113 18 82
-36 169 -116 187 -21 5 -146 10 -276 10 l-238 0 0 160 0 160 238 0 c130 0 255
5 276 10 80 18 134 105 116 187 -11 48 -66 102 -116 113 -21 5 -146 10 -276
10 l-237 0 -3 583 c-3 562 -4 583 -23 615 -38 63 -103 87 -190 70z m-504
-1451 c52 -35 79 -82 79 -137 0 -60 -2 -63 -296 -440 -126 -162 -233 -300
-237 -307 -4 -7 91 -124 248 -303 140 -160 262 -304 270 -320 70 -136 -100
-292 -226 -207 -19 12 -137 140 -264 284 -126 144 -233 265 -236 268 -3 3 -96
-111 -206 -252 -249 -320 -252 -323 -336 -323 -84 0 -157 75 -157 160 0 60 5
67 264 398 108 140 200 260 202 267 3 7 -94 126 -216 264 -121 139 -227 265
-235 281 -70 136 100 292 226 207 19 -12 123 -124 231 -247 109 -124 202 -225
207 -225 6 0 110 128 231 285 122 157 231 296 243 309 59 65 145 81 208 38z"
                />
                <path
                    d="M3961 3670 c-18 -4 -49 -23 -68 -42 -62 -62 -62 -153 0 -215 45 -45
82 -53 267 -53 185 0 222 8 267 53 85 84 43 230 -73 257 -47 11 -346 11 -393
0z"
                />
                <path
                    d="M3961 3030 c-18 -4 -49 -23 -68 -42 -62 -62 -62 -153 0 -215 45 -45
82 -53 267 -53 185 0 222 8 267 53 85 84 43 230 -73 257 -47 11 -346 11 -393
0z"
                />
                <path
                    d="M3961 2390 c-45 -11 -100 -68 -111 -113 -18 -82 36 -169 116 -187 51
-12 337 -12 388 0 80 18 134 105 116 187 -11 48 -66 102 -116 113 -47 11 -346
11 -393 0z"
                />
                <path
                    d="M3961 1750 c-45 -11 -100 -68 -111 -113 -18 -82 36 -169 116 -187 51
-12 337 -12 388 0 80 18 134 105 116 187 -11 48 -66 102 -116 113 -47 11 -346
11 -393 0z"
                />
            </g>
        </svg>,
        'Excel'
    )

    const open = Boolean(anchorEl)
    const id = open ? 'excel-loader-popover' : undefined

    return (
        <>
            <ErrorSnackbar ref={errorSnackbarRef}/>

            <IconButton onClick={handleExcel}>
                <ExcelIcon sx={{color: colors.green[600]}}/>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <Box
                    width={300}
                    p={3}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={3}
                    border={'2px solid' + colors.grey[600]}>
                    <LoaderComponent/>
                </Box>
            </Popover>
        </>
    )
}

export default ExcelTasks
