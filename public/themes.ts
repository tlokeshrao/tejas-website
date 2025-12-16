import { createTheme } from '@mui/material';
import { THEME } from './theme';

const christmasTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#D98880', // Soft Red
        },
        secondary: {
            main: '#A9DFBF', // Light Green
        },
        navbar: {
            main: '#FAD7A0', // Pale Gold
        },
    },
});

const halloweenTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#F5CBA7', // Pastel Orange
        },
        secondary: {
            main: '#AEB6BF', // Light Slate Gray
        },
        navbar: {
            main: '#C39BD3', // Pastel Purple
        },
    },
});

const valentinesTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#FADBD8', // Very Light Pink
        },
        secondary: {
            main: '#F8BBD0', // Lighter Pink
        },
        navbar: {
            main: '#F1948A', // Light Red
        },
    },
});

const stPattysTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#A3E4D7', // Mint Green
        },
        secondary: {
            main: '#F9E79F', // Pale Yellow
        },
        navbar: {
            main: '#7DCEA0', // Light Emerald
        },
    },
});

const summerTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#FCF3CF', // Pastel Yellow
        },
        secondary: {
            main: '#A9CCE3', // Light Steel Blue
        },
        navbar: {
            main: '#F5B041', // Pastel Orange
        },
    },
});

const georgiaTechTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#B3A369', // GT Old Gold
        },
        secondary: {
            main: '#003057', // GT Navy Blue
        },
        navbar: {
            main: '#FFFFFF', // White
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
    case 'georgiaTech':
      return georgiaTechTheme;
    default:
      return THEME;
  }
};
