import {
  ADDITIONAL_DISTANCE_FEE,
  FREE_DELIVERY_THRESHOLD,
  FREE_ITEM_LIMIT,
  INITIAL_DISTANCE,
  LARGE_ORDER_LIMIT,
} from '../../../constants/calculator';
import { calculateDeliveryFee } from '../index';

const DATE_TEST = new Date('2023-01-27T00:00:00.000+02:00');
const DELIVERY_FEE_CAP_TEST = 0.01;

describe('calculateDeliveryFee', () => {
  test('Returns 0 when cart value reaches the free delivery threshold', () => {
    const result = calculateDeliveryFee({
      orderValue: FREE_DELIVERY_THRESHOLD,
      distance: INITIAL_DISTANCE,
      itemCount: FREE_ITEM_LIMIT,
      time: DATE_TEST,
    });
    expect(result).toBe(0);
  });

  test('Caps the maximum delivery fee', () => {
    const result = calculateDeliveryFee({
      orderValue: FREE_DELIVERY_THRESHOLD - 1,
      distance: INITIAL_DISTANCE + ADDITIONAL_DISTANCE_FEE * 2,
      itemCount: LARGE_ORDER_LIMIT * 2,
      time: DATE_TEST,
      deliveryFeeCap: DELIVERY_FEE_CAP_TEST,
    });
    expect(result).toBe(DELIVERY_FEE_CAP_TEST);
  });
});
