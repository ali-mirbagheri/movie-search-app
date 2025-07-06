/**
 * Material-UI theme configuration for a dark theme.
 */
import { createTheme } from '@mui/material/styles';

/**
 * Dark theme configuration for the application
 */
export const darkTheme = createTheme({
  palette: {
    /**
     * Theme mode set to dark
     */
    mode: 'dark',
    background: {
      /**
       * Default background color
       */
      default: '#121212',
      /**
       * Background color for paper surfaces
       */
      paper: '#1d1d1d',
    },
    primary: {
      /**
       * Primary color for interactive elements
       */
      main: '#90caf9',
    },
    secondary: {
      /**
       * Secondary color for accents
       */
      main: '#f48fb1',
    },
    text: {
      /**
       * Primary text color
       */
      primary: '#ffffff',
      /**
       * Secondary text color
       */
      secondary: '#aaaaaa',
    },
  },
  typography: {
    /**
     * Default font family for the application
     */
    fontFamily: "'Roboto', sans-serif",
  },
});