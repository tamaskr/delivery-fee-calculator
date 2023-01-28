import {
  InputAdornment,
  Typography,
  InputBaseComponentProps,
  Collapse,
  TextFieldProps,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Units } from '../constants/units';
import { theme } from '../theme/default';
import { InputContainer, InputField } from '../styles/input';
import { TransitionGroup } from 'react-transition-group';

type InputRowProps = {
  id?: string;
  type?: TextFieldProps['type'];
  title: string;
  unit?: Units;
  value?: TextFieldProps['value'];
  errorMessage?: string;
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
  errorMessage,
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
                endAdornment: (
                  <InputAdornment position="end">{unit}</InputAdornment>
                ),
              }),
            }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errorMessage}
          />
        )}
      </InputContainer>
      <TransitionGroup>
        {errorMessage && (
          <Collapse unmountOnExit>
            <Typography
              variant="body2"
              textAlign="end"
              color={theme.palette.error.dark}
            >
              {t(errorMessage)}
            </Typography>
          </Collapse>
        )}
      </TransitionGroup>
    </>
  );
};
