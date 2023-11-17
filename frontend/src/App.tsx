import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo, orange } from '@mui/material/colors'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LayoutPage from './pages/LayoutPage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'

// Create a theme
const theme = createTheme({
	// Custom colors
	palette: {
		primary: indigo,
		secondary: orange,
	},
	// Custom typography
	typography: {
		fontFamily: `"Sulphur Point", sans-serif;`,
	},
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<LayoutPage />}>
						<Route index element={<Navigate to={'/dashboard'} />} />
						<Route path={'dashboard'} element={<DashboardPage />} />
						<Route path={'tasks'} element={<TasksPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
