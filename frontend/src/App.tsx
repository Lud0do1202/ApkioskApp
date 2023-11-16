import React from 'react';
import {Button} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {orange, indigo} from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: orange,
    }
});

function App() {
    return (<ThemeProvider theme={theme}>
        <Button variant="contained" color="primary">Secondary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="success">Secondary</Button>
    </ThemeProvider>);
}

export default App;
