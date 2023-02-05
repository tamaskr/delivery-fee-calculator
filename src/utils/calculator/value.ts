import { SmallOrderSurchargeCalculatorProps } from '../../types/calculator';
import { SMALL_ORDER_LIMIT } from '../../constants/calculator';

// Calculates an extra surcharge for small orders below the limit
export const calculateSmallOrderSurcharge = ({
  orderValue,
  smallOrderLimit = SMALL_ORDER_LIMIT,
}: SmallOrderSurchargeCalculatorProps): number => {
  // No surcharge is added for values that reach the minimum limit
  if (orderValue >= smallOrderLimit) return 0;
  // If the order value is smaller than the limit, deduct the order value from the minimum value
  return smallOrderLimit - orderValue;
};
