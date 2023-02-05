import { SmallOrderSurchargeCalculatorProps } from '../../types/calculator';
import { SMALL_ORDER_LIMIT } from '../../constants/calculator';

// Calculates surcharge for small orders below the limit
export const calculateSmallOrderSurcharge = ({
  orderValue,
  smallOrderLimit = SMALL_ORDER_LIMIT,
}: SmallOrderSurchargeCalculatorProps): number => {
  // No surcharge if order value meets minimum limit.
  if (orderValue >= smallOrderLimit) return 0;
  // Calculate surcharge by subtracting order value from minimum value if it's below the limit
  return smallOrderLimit - orderValue;
};
