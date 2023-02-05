import * as yup from 'yup';

// Basic validation format for numeric values
export const numberValidator = (label: string) => {
  return yup
    .number()
    .positive(`form.errors.positive.${label}`)
    .typeError(`form.errors.typeError.${label}`)
    .required(`form.errors.required.${label}`);
};

// Checks if the given value is a valid currency
export const validateCurrency = (value: number | undefined) => {
  // Return early for falsy values
  if (!value) return false;
  // Regex for any valid valid currency format (both comma and dot separator are accepted), up to 2 decimal points
  const currencyRegex = /^[0-9]+(\.[0-9]{0,2}|,[0-9]{0,2})?$/;
  // Check if the given value matches the regex
  return currencyRegex.test(value.toString());
};
