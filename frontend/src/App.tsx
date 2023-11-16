import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {orange, indigo} from '@mui/material/colors';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: orange,
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LayoutPage />}>
                    <Route index element={<Navigate to={"/dashboard"}/>} />
                    <Route path={"dashboard"} element={<DashboardPage />} />
                    <Route path={"tasks"} element={<TasksPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>);
}

export default App;
