import { DELIVERY_FEE_CAP, FREE_DELIVERY_THRESHOLD } from '../../constants/calculator';
import { CalculatorProps } from '../../types/calculator';
import { calculateDistanceSurcharge } from './distance';
import { calculateItemCountSurcharge } from './itemCount';
import { calculateRushHourSurcharge } from './time';
import { calculateSmallOrderSurcharge } from './value';

// Calculates delivery fee based on the given parameters
export const calculateDeliveryFee = ({
  orderValue,
  distance,
  itemCount,
  time,
  freeDeliveryThreshold = FREE_DELIVERY_THRESHOLD,
  deliveryFeeCap = DELIVERY_FEE_CAP,
}: CalculatorProps): number => {
  // Delivery is free if order value exceeds free delivery threshold (regardless of other values)
  if (orderValue >= freeDeliveryThreshold) return 0;
  // Surcharge for small orders
  const smallOrderSurcharge = calculateSmallOrderSurcharge({ orderValue });
  // Surcharge based on distance
  const distanceSurcharge = calculateDistanceSurcharge({ distance });
  // Surcharge based on the amount of items
  const itemCountSurcharge = calculateItemCountSurcharge({ itemCount });
  // Partial fee before rush hour surcharge
  const partialFee = smallOrderSurcharge + distanceSurcharge + itemCountSurcharge;
  // Surcharge for rush hour delivery
  const totalFeeWithRushHourSurcharge = calculateRushHourSurcharge({
    currentFee: partialFee,
    time,
  });
  // Total delivery fee is capped before returning
  const cappedTotalFee =
    totalFeeWithRushHourSurcharge > deliveryFeeCap ? deliveryFeeCap : totalFeeWithRushHourSurcharge;
  return cappedTotalFee;
};
