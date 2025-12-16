import { createTheme } from '@mui/material';
import { THEME } from './theme';

const christmasTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#b31217',
        },
        secondary: {
            main: '#006400',
        },
        navbar: {
            main: '#FFD700',
        },
    },
});

const halloweenTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#ff6600',
        },
        secondary: {
            main: '#000000',
        },
        navbar: {
            main: '#4B0082',
        },
    },
});

const valentinesTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#ff007f',
        },
        secondary: {
            main: '#ffc0cb',
        },
        navbar: {
            main: '#8B0000',
        },
    },
});

const stPattysTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#006400',
        },
        secondary: {
            main: '#ffd700',
        },
        navbar: {
            main: '#98FB98',
        },
    },
});

const summerTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#ffff00',
        },
        secondary: {
            main: '#00bfff',
        },
        navbar: {
            main: '#FFA500',
        },
    },
});

export const getTheme = (theme: string) => {
  switch (theme) {
    case 'christmas':
      return christmasTheme;
    case 'halloween':
      return halloweenTheme;
    case 'valentines':
      return valentinesTheme;
    case 'stPattys':
      return stPattysTheme;
    case 'summer':
      return summerTheme;
    default:
      return THEME;
  }
};
