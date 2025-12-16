import { createTheme } from '@mui/material';
import { THEME } from './theme';

const christmasTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#C41E3A', // Cardinal Red
        },
        secondary: {
            main: '#228B22', // Forest Green
        },
        navbar: {
            main: '#B8860B', // Dark Goldenrod
        },
    },
});

const halloweenTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#D35400', // Pumpkin Orange
        },
        secondary: {
            main: '#34495E', // Wet Asphalt
        },
        navbar: {
            main: '#8E44AD', // Wisteria Purple
        },
    },
});

const valentinesTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#E91E63', // Soft Pink
        },
        secondary: {
            main: '#F8BBD0', // Lighter Pink
        },
        navbar: {
            main: '#C2185B', // Deeper Pink
        },
    },
});

const stPattysTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#1E8449', // Kelly Green
        },
        secondary: {
            main: '#F1C40F', // Gold
        },
        navbar: {
            main: '#D4AC0D', // Darker Gold
        },
    },
});

const summerTheme = createTheme({
    ...THEME,
    palette: {
        ...THEME.palette,
        primary: {
            main: '#F4D03F', // Sunflower Yellow
        },
        secondary: {
            main: '#5DADE2', // Sky Blue
        },
        navbar: {
            main: '#E67E22', // Carrot Orange
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
            main: '#002D56', // GT Navy Blue
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
