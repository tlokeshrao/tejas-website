import { CssBaseline } from '@mui/material';
import { Router } from './pages/Router';
import { ThemeProvider } from './ThemeContext';

const App = () => {
    return (
        <ThemeProvider>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
};

export default App;
