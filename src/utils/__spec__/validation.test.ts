import { numberValidator, validateCurrency } from '../validation';

const LABEL_TEST = 'value';

describe('numberValidator', () => {
  test('Validates a positive number', async () => {
    const validNumber = 1;
    const validator = numberValidator(LABEL_TEST);
    await expect(validator.validate(validNumber)).resolves.toEqual(validNumber);
  });

  test('Fails validation for a negative number', async () => {
    const invalidNumber = -1;
    const validator = numberValidator(LABEL_TEST);
    await expect(validator.validate(invalidNumber)).rejects.toThrow(`form.errors.positive.${LABEL_TEST}`);
  });

  test('Fails validation for a non-numeric value', async () => {
    const invalidValue = 'test';
    const validator = numberValidator(LABEL_TEST);
    await expect(validator.validate(invalidValue)).rejects.toThrow(`form.errors.typeError.${LABEL_TEST}`);
  });

  test('Fails validation for undefined value', async () => {
    const invalidValue = undefined;
    const validator = numberValidator(LABEL_TEST);
    await expect(validator.validate(invalidValue)).rejects.toThrow(`form.errors.required.${LABEL_TEST}`);
  });
});

describe('validateCurrency', () => {
  test('Returns true for a valid currency with dot separator', () => {
    const result = validateCurrency(1.55);
    expect(result).toBe(true);
  });

  test('Returns true for a valid currency with one decimal', () => {
    const result = validateCurrency(1.5);
    expect(result).toBe(true);
  });

  test('Returns true for a valid whole currency', () => {
    const result = validateCurrency(1);
    expect(result).toBe(true);
  });

  test('Returns false for for an invalid currency with three decimals', () => {
    const result = validateCurrency(1.555);
    expect(result).toBe(false);
  });

  test('Returns false for a valid whole currency', () => {
    const result = validateCurrency(-1);
    expect(result).toBe(false);
  });
});
