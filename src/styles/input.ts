import { styled, TextField, Box } from '@mui/material';

export const InputField = styled(TextField)(({ theme }) => ({
  width: '50%',
  '& fieldset': {
    borderRadius: theme.spacing(1.5),
    transition : '500ms',
  },
  '& input': {
    textAlign: 'right',
    paddingRight: theme.spacing(0.5),
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: `${theme.spacing(1.5)} 0 ${theme.spacing(0.5)} 0`,
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'start',
  },
}));
