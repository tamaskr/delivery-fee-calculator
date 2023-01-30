import { calculateSmallOrderSurcharge } from '../value';

const SMALL_ORDER_LIMIT_TEST = 50;

describe('calculateSmallOrderSurcharge', () => {
  it('Returns 0 for order equal to or above the small order limit', () => {
    const result = calculateSmallOrderSurcharge({ orderValue: 50, smallOrderLimit: SMALL_ORDER_LIMIT_TEST });
    expect(result).toBe(0);
  });

  it('Returns 0 for order above the small order limit', () => {
    const result = calculateSmallOrderSurcharge({ orderValue: 51, smallOrderLimit: SMALL_ORDER_LIMIT_TEST });
    expect(result).toBe(0);
  });

  it('Returns the difference between the small order limit and order value for orders below the limit', () => {
    const result = calculateSmallOrderSurcharge({ orderValue: 25.5, smallOrderLimit: SMALL_ORDER_LIMIT_TEST });
    expect(result).toBe(24.5);
  });
});
