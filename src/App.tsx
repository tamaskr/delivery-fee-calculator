import { TextFieldProps } from '@mui/material';
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

const initialFormValues = {
  value: '',
  distance: '',
  amount: '',
  time: new Date(),
};

const validationSchema = yup.object({
  value: numberValidator('value'),
  distance: numberValidator('distance'),
  amount: numberValidator('amount'),
  time: yup
    .date()
    .typeError('form.errors.typeError.time')
    .required('form.errors.required.time'),
});

const App = () => {
  const { t } = useTranslation();

  const onSubmit = ({
    value,
    distance,
    amount,
    time,
  }: {
    value: string;
    distance: string;
    amount: string;
    time: Date;
  }) => {
    console.log('onSubmit');
  };

  return (
    <ContentContainer>
      <GradientTitle variant="h3" fontWeight="bold" textAlign="center">
        {t('general.title')}
      </GradientTitle>
      <Formik
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleBlur, setFieldValue }) => (
          <Form autoComplete="off">
            <InputRow
              id="value"
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
              title="general.distance"
              unit={Units.Meter}
              value={values.distance}
              errorMessage={
                touched.distance && errors.distance
                  ? errors.distance
                  : undefined
              }
              inputProps={{ inputMode: 'numeric' }}
              onChange={(event) => {
                const value = event.target.value;
                setFieldValue('distance', value.replace(/\D/g, ''));
              }}
              onBlur={handleBlur}
            />
            <InputRow
              id="amount"
              title="general.amount"
              value={values.amount}
              errorMessage={
                touched.amount && errors.amount ? errors.amount : undefined
              }
              inputProps={{
                inputMode: 'numeric',
                style: { paddingRight: theme.spacing(2) },
              }}
              onChange={(event) => {
                const value = event.target.value;
                setFieldValue('amount', value.replace(/\D/g, ''));
              }}
              onBlur={handleBlur}
            />
            <InputRow
              title="general.time"
              errorMessage={
                touched.time && errors.time && typeof errors.time === 'string'
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
          </Form>
        )}
      </Formik>
    </ContentContainer>
  );
};

export default App;
