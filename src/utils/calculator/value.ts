import { SmallOrderSurchargeCalculatorProps } from '../../types/calculator';
import { SMALL_ORDER_LIMIT } from '../../constants/calculator';

// Calculates an extra fee for small orders below a given limit
export const calculateSmallOrderSurcharge = ({
  orderValue,
  smallOrderLimit = SMALL_ORDER_LIMIT,
}: SmallOrderSurchargeCalculatorProps): number => {
  // Surchage for small orders is calculated by deducting the order value from the minimum value
  if (orderValue < smallOrderLimit) return smallOrderLimit - orderValue;
  // No fee is added for the remaining values
  return 0;
};
