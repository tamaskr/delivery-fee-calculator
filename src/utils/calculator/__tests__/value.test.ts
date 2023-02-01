import { calculateSmallOrderSurcharge } from '../value';

const SMALL_ORDER_LIMIT_TEST = 50;

describe('calculateSmallOrderSurcharge', () => {
  it('Returns 0 for order equal to the small order limit', () => {
    const result = calculateSmallOrderSurcharge({
      orderValue: SMALL_ORDER_LIMIT_TEST,
      smallOrderLimit: SMALL_ORDER_LIMIT_TEST,
    });
    expect(result).toBe(0);
  });

  it('Returns 0 for order above the small order limit', () => {
    const result = calculateSmallOrderSurcharge({
      orderValue: SMALL_ORDER_LIMIT_TEST + 1,
      smallOrderLimit: SMALL_ORDER_LIMIT_TEST,
    });
    expect(result).toBe(0);
  });

  it('Returns the difference between the limit and order value for orders below the small order limit', () => {
    const result = calculateSmallOrderSurcharge({
      orderValue: SMALL_ORDER_LIMIT_TEST / 2,
      smallOrderLimit: SMALL_ORDER_LIMIT_TEST,
    });
    expect(result).toBe(SMALL_ORDER_LIMIT_TEST / 2);
  });
});
