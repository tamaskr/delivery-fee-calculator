import { FREE_ITEM_LIMIT } from '../../../constants/calculator';
import { calculateItemCountSurcharge } from '../itemCount';

const FREE_ITEM_LIMIT_TEST = 5;
const EXTRA_ITEM_FEE_TEST = 0.2;
const LARGE_ORDER_LIMIT_TEST = 20;
const LARGE_ORDER_FEE_TEST = 1;

describe('calculateItemCountSurcharge', () => {
  test('Returns 0 for item count within the free limit', () => {
    const result = calculateItemCountSurcharge({ itemCount: FREE_ITEM_LIMIT });
    expect(result).toBe(0);
  });

  test('Calculates item count surcharge for items between the free limit and the large order limit', () => {
    const result = calculateItemCountSurcharge({
      itemCount: FREE_ITEM_LIMIT_TEST + 2,
      extraItemFee: EXTRA_ITEM_FEE_TEST,
      freeItemLimit: FREE_ITEM_LIMIT_TEST,
      largeOrderLimit: LARGE_ORDER_LIMIT_TEST,
      largeOrderFee: LARGE_ORDER_FEE_TEST,
    });
    expect(result).toBe(EXTRA_ITEM_FEE_TEST * 2);
  });

  test('Calculates item count surcharge for items above the large order limit', () => {
    const result = calculateItemCountSurcharge({
      itemCount: LARGE_ORDER_LIMIT_TEST,
      extraItemFee: EXTRA_ITEM_FEE_TEST,
      freeItemLimit: FREE_ITEM_LIMIT_TEST,
      largeOrderLimit: LARGE_ORDER_LIMIT_TEST,
      largeOrderFee: LARGE_ORDER_FEE_TEST,
    });
    expect(result).toBe(LARGE_ORDER_FEE_TEST + (LARGE_ORDER_LIMIT_TEST - FREE_ITEM_LIMIT_TEST) * EXTRA_ITEM_FEE_TEST);
  });
});
