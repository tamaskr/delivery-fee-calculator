import { Typography, styled } from '@mui/material';

export const GradientTitle = styled(Typography)(({ theme }) => ({
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  paddingBottom: theme.spacing(1),
}));
