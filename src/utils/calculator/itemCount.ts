import {
  EXTRA_ITEM_FEE,
  FREE_ITEM_LIMIT,
  LARGE_ORDER_FEE,
  LARGE_ORDER_LIMIT,
} from '../../constants/calculator';
import { ItemCountSurchargeCalculatorProps } from '../../types/calculator';

// Calculates an extra fee for small orders below a given limit
export const calculateItemCountSurcharge = ({
  itemCount,
  freeItemLimit = FREE_ITEM_LIMIT,
  extraItemFee = EXTRA_ITEM_FEE,
  largeOrderLimit = LARGE_ORDER_LIMIT,
  largeOrderFee = LARGE_ORDER_FEE,
}: ItemCountSurchargeCalculatorProps): number => {
  // No surcharge will be added if the item count is below the free limit
  if (itemCount >= freeItemLimit) return 0;
  // Calculate extra charge per piece
  const extraItemSurcharge = (itemCount - freeItemLimit) * extraItemFee;
  return itemCount >= largeOrderLimit
    ? largeOrderFee + extraItemSurcharge
    : extraItemSurcharge;
};
