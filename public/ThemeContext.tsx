import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, useState, useMemo } from 'react';
import { getTheme } from './themes';

export const ThemeContext = createContext({
    theme: 'default',
    setTheme: (theme: string) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState('default');

    const themeValue = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={themeValue}>
            <MuiThemeProvider theme={getTheme(theme)}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
