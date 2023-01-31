import { DELIVERY_FEE_CAP, FREE_DELIVERY_TRESHOLD } from '../../constants/calculator';
import { CalculatorProps } from '../../types/calculator';
import { calculateDistanceSurcharge } from './distance';
import { calculateItemCountSurcharge } from './itemCount';
import { calculateRushHourSurcharge } from './time';
import { calculateSmallOrderSurcharge } from './value';

// Calculates the delivery fee based on the given parameters
export const calculateDeliveryFee = ({
  orderValue,
  distance,
  itemCount,
  time,
  freeDeliveryTreshold = FREE_DELIVERY_TRESHOLD,
  deliveryFeeCap = DELIVERY_FEE_CAP,
}: CalculatorProps): number => {
  // Delivery is free if the order value exceeds the free delivery treshold (regardless of other values)
  if (orderValue >= freeDeliveryTreshold) return 0;
  // Surcharge for small orders
  const smallOrderSurcharge = calculateSmallOrderSurcharge({ orderValue });
  // Surcharge based on distance
  const distanceSurcharge = calculateDistanceSurcharge({ distance });
  // Surcharge based on the amount of items
  const itemCountSurcharge = calculateItemCountSurcharge({ itemCount });
  // Temporary total fee including all possible surcharges
  const partialFee = smallOrderSurcharge + distanceSurcharge + itemCountSurcharge;
  // Surcharge for rush hour delivery
  const totalFeeWithRushHourSurcharge = calculateRushHourSurcharge({
    currentFee: partialFee,
    time,
  });
  // The total delivery fee is capped before returning
  const cappedTotalFee =
    totalFeeWithRushHourSurcharge > deliveryFeeCap ? deliveryFeeCap : totalFeeWithRushHourSurcharge;
  // Convert the total fee to a string before returning
  return cappedTotalFee;
};
