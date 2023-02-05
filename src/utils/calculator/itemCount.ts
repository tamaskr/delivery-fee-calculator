import { EXTRA_ITEM_FEE, FREE_ITEM_LIMIT, LARGE_ORDER_FEE, LARGE_ORDER_LIMIT } from '../../constants/calculator';
import { ItemCountSurchargeCalculatorProps } from '../../types/calculator';

// Calculates surcharge based on item count
export const calculateItemCountSurcharge = ({
  itemCount,
  freeItemLimit = FREE_ITEM_LIMIT,
  extraItemFee = EXTRA_ITEM_FEE,
  largeOrderLimit = LARGE_ORDER_LIMIT,
  largeOrderFee = LARGE_ORDER_FEE,
}: ItemCountSurchargeCalculatorProps): number => {
  // No surcharge if item count is below the free limit
  if (itemCount <= freeItemLimit) return 0;
  // Calculate charge for items above the free limit
  const extraItemSurcharge = (itemCount - freeItemLimit) * extraItemFee;
  // Apply large order fee for orders exceeding the item limit
  const itemCountSurcharge = itemCount >= largeOrderLimit ? largeOrderFee + extraItemSurcharge : extraItemSurcharge;
  return itemCountSurcharge;
};
