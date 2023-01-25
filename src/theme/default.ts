import { createTheme } from '@mui/material';

// Setup MaterialUI theme
export const theme = createTheme({
  palette: {
    primary: { main: '#4D4DBD' },
    secondary: { main: '#8859B5' },
  },
  // Custom properties for all texts
  typography: {
    allVariants: {
      color: '#212427',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
});
