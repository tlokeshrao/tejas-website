import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useTheme } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

/**
 * Renders the home page.
 *
 * @component
 */
export const HomePage = () => {
    const { theme: currentTheme, setTheme } = useContext(ThemeContext);
    const theme = useTheme();

    const handleThemeChange = (event: SelectChangeEvent<string>) => {
        setTheme(event.target.value);
    };

    return (
        <div
            style={{
                backgroundColor: theme.palette.primary.main,
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                paddingTop: '100px',
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="theme-select-label">Theme</InputLabel>
                    <Select
                        labelId="theme-select-label"
                        id="theme-select"
                        value={currentTheme}
                        label="Theme"
                        onChange={handleThemeChange}
                    >
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="christmas">Christmas</MenuItem>
                        <MenuItem value="halloween">Halloween</MenuItem>
                        <MenuItem value="valentines">Valentines</MenuItem>
                        <MenuItem value="stPattys">St. Patty's</MenuItem>
                        <MenuItem value="summer">Summer</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <h1 style={{ color: theme.palette.common.black, fontSize: '3rem' }}>
                Welcome to Tejas' Website
            </h1>
            <p style={{ color: theme.palette.secondary.main, fontSize: '1.25rem' }}>
                Interesting things to come...
            </p>
        </div>
    );
};
