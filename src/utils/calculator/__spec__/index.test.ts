import {
  ADDITIONAL_DISTANCE_FEE,
  FREE_DELIVERY_TRESHOLD,
  FREE_ITEM_LIMIT,
  INITIAL_DISTANCE,
  LARGE_ORDER_LIMIT,
} from '../../../constants/calculator';
import { calculateDeliveryFee } from './../index';

const DATE_TEST = new Date('2023-01-27T00:00:00.000+02:00');

describe('calculateDeliveryFee', () => {
  test('Returns 0 when cart value reaches the free delivery treshold', () => {
    const result = calculateDeliveryFee({
      orderValue: FREE_DELIVERY_TRESHOLD,
      distance: INITIAL_DISTANCE,
      itemCount: FREE_ITEM_LIMIT,
      time: DATE_TEST,
    });
    expect(result).toBe('0');
  });

  test('Caps the maximum delivery fee', () => {
    const result = calculateDeliveryFee({
      orderValue: FREE_DELIVERY_TRESHOLD - 1,
      distance: INITIAL_DISTANCE + ADDITIONAL_DISTANCE_FEE * 2,
      itemCount: LARGE_ORDER_LIMIT * 2,
      time: DATE_TEST,
      deliveryFeeCap: 0.01,
    });
    expect(result).toBe('0.01');
  });
});
