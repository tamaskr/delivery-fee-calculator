import {
  InputAdornment,
  Typography,
  InputBaseComponentProps,
  Collapse,
} from '@mui/material';
import { ChangeEvent, FocusEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Units } from '../constants/units';
import { theme } from '../theme/default';
import { InputContainer, InputField } from '../styles/input';
import { TransitionGroup } from 'react-transition-group';

type InputRowProps = {
  id?: string;
  title: string;
  unit?: Units;
  value?: string | number | Date;
  errorMessage?: string;
  inputProps?: InputBaseComponentProps;
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  children?: React.ReactNode;
};

export const InputRow = ({
  id,
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
