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

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
  margin: `${theme.spacing(2)} 0`,
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  boxShadow: 'rgba(0, 0, 0, 0.12) 0 4px 12px',
}));
