import { render } from '@testing-library/react';
import { InputRow } from '../InputRow';
import { Units } from '../../constants/units';

const ID_TEST = 'input-row';
const TITLE_TEST = 'Test title';
const VALUE_TEST = 'Test value';

// Mock i18n translation hook
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: { changeLanguage: () => new Promise(() => null) },
    };
  },
}));

describe('InputRow', () => {
  it('Renders value if provided', () => {
    const { container } = render(<InputRow id={ID_TEST} title={TITLE_TEST} value={VALUE_TEST} />);
    const input = container.querySelector(`#${ID_TEST}`);
    expect((input as HTMLInputElement).value).toBe(VALUE_TEST);
  });

  it('Renders title if provided', () => {
    const { getByText } = render(<InputRow title={TITLE_TEST} />);
    expect(getByText(TITLE_TEST)).toBeDefined();
  });

  it('Renders error message if provided', () => {
    const error = 'form.errors.currency';
    const { getByText } = render(<InputRow title={TITLE_TEST} error={error} />);
    expect(getByText(error)).toBeDefined();
  });

  it('Renders unit if provided', () => {
    const { getByText } = render(<InputRow title={TITLE_TEST} unit={Units.Euro} />);
    expect(getByText(Units.Euro)).toBeDefined();
  });

  it('Renders children if provided', () => {
    const children = <div>Children</div>;
    const { getByText } = render(<InputRow title={TITLE_TEST}>{children}</InputRow>);
    expect(getByText('Children')).toBeDefined();
  });
});
