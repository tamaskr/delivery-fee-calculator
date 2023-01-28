import { Box, styled } from '@mui/material';
import background from '../assets/background.svg';

export const MainLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundColor: theme.palette.background.default,
}));
