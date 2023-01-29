import * as yup from 'yup';

export const numberValidator = (label: string) => {
  return yup
    .number()
    .positive(`form.errors.positive.${label}`)
    .typeError(`form.errors.typeError.${label}`)
    .required(`form.errors.required.${label}`);
};

export const validateCurrency = (value: number | undefined) => {
  if (!value) return false;
  const currencyRegex = /^[0-9]+(\.[0-9]{0,2}|,[0-9]{0,2})?$/;
  return currencyRegex.test(value.toString());
};
