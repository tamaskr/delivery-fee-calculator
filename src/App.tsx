import { useState } from 'react';
import { Collapse, Grow, TextFieldProps, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import CountUp from 'react-countup';
import { theme } from './theme/default';
import { numberValidator, validateCurrency } from './utils/validation';
import { Units } from './constants/units';
import { InputRow } from './components/InputRow';
import { GradientTitle, InputField, ContentContainer, PrimaryButton, TextButton } from './styles';
import { calculateDeliveryFee } from './utils/calculator';
import { FormValues } from './types/form';

const initialFormValues: FormValues = {
  value: '',
  distance: '',
  itemCount: '',
  time: new Date(),
};

const validationSchema = yup.object({
  value: numberValidator('value')
    .max(100000, 'form.errors.max.value')
    .test('currency', 'form.errors.currency', validateCurrency),
  distance: numberValidator('distance').max(50000, 'form.errors.max.distance').integer('form.errors.integer.distance'),
  itemCount: numberValidator('itemCount')
    .max(500, 'form.errors.max.itemCount')
    .integer('form.errors.integer.itemCount'),
  time: yup.date().typeError('form.errors.typeError.time').required('form.errors.required.time'),
});

const App = () => {
  const { t } = useTranslation();

  const [deliveryFee, setDeliveryFee] = useState<string | null>();

  const onSubmit = ({ value, distance, itemCount, time }: FormValues) => {
    const deliveryFee = calculateDeliveryFee({
      orderValue: Number(value),
      distance: Number(distance),
      itemCount: Number(itemCount),
      time,
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
          <Formik initialValues={initialFormValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ values, errors, touched, isValid, dirty, handleChange, handleReset, handleBlur, setFieldValue }) => (
              <Form autoComplete="off">
                {/* Input for order value */}
                <InputRow
                  id="value"
                  type="number"
                  title="general.value"
                  unit={Units.Euro}
                  value={values.value}
                  error={touched.value && errors.value}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* Input for order distance */}
                <InputRow
                  id="distance"
                  type="number"
                  title="general.distance"
                  unit={Units.Meter}
                  value={values.distance}
                  error={touched.distance && errors.distance}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* Input for count of items */}
                <InputRow
                  id="itemCount"
                  type="number"
                  title="general.itemCount"
                  value={values.itemCount}
                  error={touched.itemCount && errors.itemCount}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* Custom date and time picker input for order time */}
                <InputRow title="general.time" error={touched.time && (errors.time as string)}>
                  <DateTimePicker
                    value={values.time}
                    ampmInClock
                    onChange={(value) => setFieldValue('time', value, true)}
                    renderInput={(params: TextFieldProps) => <InputField id="time" onBlur={handleBlur} {...params} />}
                  />
                </InputRow>
                <PrimaryButton type="submit" disabled={!(isValid && dirty)} sx={{ marginTop: theme.spacing(3) }}>
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
                      <Typography variant="h6" textAlign="center" sx={{ marginTop: theme.spacing(2) }}>
                        {t('general.deliveryFeeTitle')}
                      </Typography>
                      <GradientTitle variant="h3" fontWeight="bold" textAlign="center">
                        <CountUp
                          start={0}
                          end={Number(deliveryFee)}
                          duration={0.5}
                          separator=" "
                          decimals={2}
                          decimal="."
                          suffix={Units.Euro}
                        />
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
