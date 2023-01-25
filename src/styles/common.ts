import { Typography, Box, styled } from '@mui/material';

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  boxShadow: 'rgba(0, 0, 0, 0.12) 0 4px 12px'
}));

export const GradientTitle = styled(Typography)(({ theme }) => ({
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  paddingBottom: theme.spacing(1),
}));
