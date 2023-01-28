import { Collapse, Grow, TextFieldProps, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { theme } from './theme/default';
import { numberValidator, validateCurrencyValue } from './utils/validation';
import { Units } from './constants/units';
import { InputRow } from './components/InputRow';
import { ContentContainer, GradientTitle } from './styles/common';
import { InputField } from './styles/input';
import { TransitionGroup } from 'react-transition-group';
import { PrimaryButton, TextButton } from './styles/buttons';
import { calculateDeliveryFee } from './utils/calculator';
import { useState } from 'react';

const initialFormValues = {
  value: '',
  distance: '',
  itemCount: '',
  time: new Date(),
};

const validationSchema = yup.object({
  value: numberValidator('value'),
  distance: numberValidator('distance').integer('form.errors.integer.distance'),
  itemCount: numberValidator('itemCount').integer(
    'form.errors.integer.itemCount'
  ),
  time: yup
    .date()
    .typeError('form.errors.typeError.time')
    .required('form.errors.required.time'),
});

const App = () => {
  const [deliveryFee, setDeliveryFee] = useState<number | null>();
  const { t } = useTranslation();

  const onSubmit = ({
    value,
    distance,
    itemCount,
    time,
  }: {
    value: string;
    distance: string;
    itemCount: string;
    time: Date;
  }) => {
    const deliveryFee = calculateDeliveryFee({
      orderValue: Number(value),
      distance: Number(distance),
      itemCount: Number(itemCount),
      time: time.toUTCString(),
    });
    setDeliveryFee(deliveryFee);
  };

  return (
    <TransitionGroup>
      <Grow timeout={1000}>
        <ContentContainer>
          <GradientTitle variant="h3" fontWeight="bold" textAlign="center">
            {t('general.title')}
          </GradientTitle>
          <Formik
            initialValues={initialFormValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              dirty,
              handleChange,
              handleReset,
              handleBlur,
              setFieldValue,
            }) => (
              <Form autoComplete="off">
                <InputRow
                  id="value"
                  type="number"
                  title="general.value"
                  unit={Units.Euro}
                  value={values.value}
                  errorMessage={
                    touched.value && errors.value ? errors.value : undefined
                  }
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={(event) => {
                    const value = event.target.value;
                    validateCurrencyValue(value, (formattedValue) => {
                      setFieldValue('value', formattedValue);
                    });
                  }}
                  onBlur={handleBlur}
                />
                <InputRow
                  id="distance"
                  type="number"
                  title="general.distance"
                  unit={Units.Meter}
                  value={values.distance}
                  errorMessage={
                    touched.distance && errors.distance
                      ? errors.distance
                      : undefined
                  }
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRow
                  id="itemCount"
                  type="number"
                  title="general.itemCount"
                  value={values.itemCount}
                  errorMessage={
                    touched.itemCount && errors.itemCount
                      ? errors.itemCount
                      : undefined
                  }
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRow
                  title="general.time"
                  errorMessage={
                    touched.time &&
                    errors.time &&
                    typeof errors.time === 'string'
                      ? errors.time
                      : undefined
                  }
                >
                  <DateTimePicker
                    value={values.time}
                    ampmInClock
                    onChange={(value) => setFieldValue('time', value, true)}
                    renderInput={(params: TextFieldProps) => (
                      <InputField id="time" onBlur={handleBlur} {...params} />
                    )}
                  />
                </InputRow>
                <PrimaryButton
                  type="submit"
                  disableRipple
                  disabled={!(isValid && dirty)}
                  sx={{ marginTop: theme.spacing(3) }}
                >
                  {t('general.calculate')}
                </PrimaryButton>
                <TransitionGroup>
                  {deliveryFee && (
                    <Collapse unmountOnExit>
                      <TextButton
                        size="small"
                        disableRipple
                        style={{ marginTop: theme.spacing(1) }}
                        onClick={() => {
                          setDeliveryFee(null);
                          handleReset();
                        }}
                      >
                        {t('general.reset')}
                      </TextButton>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{ marginTop: theme.spacing(2) }}
                      >
                        {t('general.deliveryFeeTitle')}
                      </Typography>
                      <GradientTitle
                        variant="h3"
                        fontWeight="bold"
                        textAlign="center"
                      >
                        {`${deliveryFee} ${Units.Euro}`}
                      </GradientTitle>
                    </Collapse>
                  )}
                </TransitionGroup>
              </Form>
            )}
          </Formik>
        </ContentContainer>
      </Grow>
    </TransitionGroup>
  );
};

export default App;
