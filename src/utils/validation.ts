import * as yup from 'yup';

export const numberValidator = (label: string) => {
  return yup
    .number()
    .min(0,`form.errors.min.${label}`)
    .typeError(`form.errors.typeError.${label}`)
    .required(`form.errors.required.${label}`);
};

export const validateCurrencyValue = (
  value: string,
  onValidValue: (formattedValue: string) => void
) => {
  const formattedValue = value
    .replace(/[^0-9.]/g, '')
    .replace(/(\.[0-9]{2}).+$/, '$1');
  if (formattedValue === '.' || formattedValue.split('.').length > 2) return;
  onValidValue(formattedValue);
};
