/**
 * ThemeProvider component for applying Material-UI theme to the application.
 */
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme';

/**
 * Props for the ThemeProvider component
 */
interface Props {
  /**
   * Child components to be wrapped by the theme provider
   */
  children: ReactNode;
}

/**
 * Wraps the application with Material-UI theme and CSS baseline
 * @param props - Component props
 * @returns A React component that applies the dark theme
 */
export function ThemeProvider({ children }: Props) {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}