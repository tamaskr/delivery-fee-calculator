import { SmallOrderSurchargeCalculatorProps } from '../../types/calculator';
import { SMALL_ORDER_LIMIT } from '../../constants/calculator';

// Calculates an extra fee for small orders below a given limit
export const calculateSmallOrderSurcharge = ({
  orderValue,
  minOrderValue = SMALL_ORDER_LIMIT,
}: SmallOrderSurchargeCalculatorProps): number => {
  if (orderValue < minOrderValue) return minOrderValue - orderValue;
  return 0;
};
