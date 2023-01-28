import { SmallOrderSurchargeCalculatorProps } from '../../types/calculator';
import * as VALUES from '../../constants/calculator';

// Calculates an extra fee for small orders below a given limit
export const calculateSmallOrderSurcharge = ({
  orderValue,
  minOrderValue = VALUES.SMALL_ORDER_LIMIT,
}: SmallOrderSurchargeCalculatorProps): number => {
  if (orderValue < minOrderValue) return minOrderValue - orderValue;
  return 0;
};
