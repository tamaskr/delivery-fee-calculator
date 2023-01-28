import { Button, styled } from '@mui/material';

export const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'rgba(0, 0, 0, 0.12) 0 4px 12px',
  color: theme.palette.background.default,
  fontSize: 18,
  width: '100%',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.primary.light,
    opacity: '0.7',
    cursor: 'not-allowed',
    pointerEvents: 'all !important',
  },
}));

export const TextButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  margin: '0 auto',
  borderRadius: theme.spacing(1.5),
  color: theme.palette.primary.main,
}));
