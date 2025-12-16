import { createTheme } from '@mui/material';
import { THEME } from './theme';

const christmasTheme = createTheme({
  palette: {
    primary: {
      main: '#b31217',
    },
    secondary: {
      main: '#006400',
    },
    sleeper: {
        main: '#121428',
        secondary: '#1A1D3A',
        tertiary: '#E5E9F2',
        quaternary: '#00F0FF',
    }
  },
});

const halloweenTheme = createTheme({
  palette: {
    primary: {
      main: '#ff6600',
    },
    secondary: {
      main: '#000000',
    },
    sleeper: {
        main: '#121428',
        secondary: '#1A1D3A',
        tertiary: '#E5E9F2',
        quaternary: '#00F0FF',
    }
  },
});

const valentinesTheme = createTheme({
  palette: {
    primary: {
      main: '#ff007f',
    },
    secondary: {
      main: '#ffc0cb',
    },
    sleeper: {
        main: '#121428',
        secondary: '#1A1D3A',
        tertiary: '#E5E9F2',
        quaternary: '#00F0FF',
    }
  },
});

const stPattysTheme = createTheme({
  palette: {
    primary: {
      main: '#006400',
    },
    secondary: {
      main: '#ffd700',
    },
    sleeper: {
        main: '#121428',
        secondary: '#1A1D3A',
        tertiary: '#E5E9F2',
        quaternary: '#00F0FF',
    }
  },
});

const summerTheme = createTheme({
  palette: {
    primary: {
      main: '#ffff00',
    },
    secondary: {
      main: '#00bfff',
    },
    sleeper: {
        main: '#121428',
        secondary: '#1A1D3A',
        tertiary: '#E5E9F2',
        quaternary: '#00F0FF',
    }
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
