import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { InputAdornment, Typography, InputBaseComponentProps, Collapse, TextFieldProps } from '@mui/material';
import { Units } from '../constants/units';
import { theme } from '../theme/default';
import { InputContainer, InputField } from '../styles/input';

type InputRowProps = {
  id?: string;
  type?: TextFieldProps['type'];
  title: string;
  unit?: Units;
  value?: TextFieldProps['value'];
  error?: string | boolean;
  inputProps?: InputBaseComponentProps;
  onChange?: TextFieldProps['onChange'];
  onBlur?: TextFieldProps['onBlur'];
  children?: React.ReactNode;
};

export const InputRow = ({
  id,
  type,
  title,
  unit,
  value,
  error,
  inputProps,
  onChange,
  onBlur,
  children,
}: InputRowProps) => {
  const { t } = useTranslation();

  return (
    <>
      <InputContainer>
        <Typography>{t(title)}</Typography>
        {children ?? (
          <InputField
            id={id}
            type={type ?? 'text'}
            InputProps={{
              inputProps,
              ...(unit && {
                endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
              }),
            }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!error}
          />
        )}
      </InputContainer>
      <TransitionGroup>
        {typeof error === 'string' && (
          <Collapse unmountOnExit>
            <Typography variant="body2" textAlign="end" color={theme.palette.error.dark}>
              {t(error)}
            </Typography>
          </Collapse>
        )}
      </TransitionGroup>
    </>
  );
};
