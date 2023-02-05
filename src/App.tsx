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
  cartValue: '',
  distance: '',
  itemCount: '',
  time: new Date(),
};

// Validation schema for delivery fee calculator form inputs
const validationSchema = yup.object({
  cartValue: numberValidator('cartValue')
    .max(100000, 'form.errors.max.cartValue')
    .test('currency', 'form.errors.currency', validateCurrency),
  distance: numberValidator('distance').max(100000, 'form.errors.max.distance').integer('form.errors.integer.distance'),
  itemCount: numberValidator('itemCount')
    .max(1000, 'form.errors.max.itemCount')
    .integer('form.errors.integer.itemCount'),
  time: yup.date().typeError('form.errors.typeError.time').required('form.errors.required.time'),
});

const App = () => {
  const { t } = useTranslation();
  // Calculated delivery fee
  const [deliveryFee, setDeliveryFee] = useState<number | null>();
  // State for controlling date picker visibility
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  // Calculate delivery fee after submitting the form
  const onSubmit = ({ cartValue, distance, itemCount, time }: FormValues) => {
    const deliveryFee = calculateDeliveryFee({
      orderValue: Number(cartValue),
      distance: Number(distance),
      itemCount: Number(itemCount),
      time,
    });
    setDeliveryFee(deliveryFee);
  };

  // Formatting for date input
  const dateFormat = 'yyyy-MM-dd hh:mm a';

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
                {/* Input for cart value */}
                <InputRow
                  id="cartValue"
                  type="number"
                  title="general.cartValue"
                  unit={Units.Euro}
                  value={values.cartValue}
                  error={touched.cartValue && errors.cartValue}
                  inputProps={{ inputMode: 'decimal' }}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* Custom date and time picker input for time input */}
                <InputRow title="general.time" error={touched.time && (errors.time as string)}>
                  <DateTimePicker
                    value={values.time}
                    open={datePickerOpen}
                    onOpen={() => setDatePickerOpen(true)}
                    onClose={() => setDatePickerOpen(false)}
                    inputFormat={dateFormat}
                    onChange={(time) => setFieldValue('time', time, true)}
                    renderInput={(params: TextFieldProps) => (
                      <InputField
                        id="time"
                        focused={datePickerOpen}
                        onClick={() => setDatePickerOpen(true)}
                        {...params}
                        inputProps={{ ...params.inputProps, readOnly: true, style: { cursor: 'pointer' } }}
                        InputProps={{ ...params.InputProps, style: { cursor: 'pointer' } }}
                      />
                    )}
                  />
                </InputRow>
                <PrimaryButton type="submit" disabled={!(isValid && dirty)} sx={{ marginTop: theme.spacing(1.5) }}>
                  {t('general.calculate')}
                </PrimaryButton>
                <TransitionGroup>
                  {/* The calculated delivery fee can also be 0, which is falsy -> type check is preferred */}
                  {typeof deliveryFee === 'number' && (
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
                      <Typography textAlign="center" sx={{ marginTop: theme.spacing(2) }}>
                        {t('general.deliveryFeeTitle')}
                      </Typography>
                      <GradientTitle variant="h3" fontWeight="bold" textAlign="center">
                        <CountUp
                          start={0}
                          end={deliveryFee}
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
