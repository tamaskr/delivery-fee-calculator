import { createTheme } from '@mui/material';

// Setup MaterialUI theme
export const theme = createTheme({
  // Custom color palette
  palette: {
    primary: { main: '#4D4DBD' },
    secondary: { main: '#8859B5' },
    background: { default: '#FEFEFE' },
  },
  // Custom properties for all texts
  typography: {
    allVariants: {
      color: '#212427',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiPopper: {
      defaultProps: {
        sx: (theme) => ({
          '& .MuiClock-pmButton, & .MuiClock-amButton': {
            height: theme.spacing(4.5),
            width: theme.spacing(4.5),
            '& .MuiTypography-root': {
              backgroundColor: theme.palette.background.default,
              borderRadius: theme.spacing(10),
              padding: theme.spacing(0.7)
            },
          }
        })
      }
    },
  },
});
