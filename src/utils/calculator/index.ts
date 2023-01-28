import { FREE_DELIVERY_TRESHOLD } from '../../constants/calculator';
import { CalculatorProps } from '../../types/calculator';
import { calculateDistanceSurcharge } from './distance';
import { calculateItemCountSurcharge } from './itemCount';
import { calculateSmallOrderSurcharge } from './value';

// Calculates the delivery fee based on the given parameters
export const calculateDeliveryFee = ({
  orderValue,
  distance,
  itemCount,
  time,
  freeDeliveryTreshold = FREE_DELIVERY_TRESHOLD,
}: CalculatorProps) => {
  // Regardless of other values, delivery fee will be 0 if the order value exceeds the free delivery treshold
  if (orderValue > freeDeliveryTreshold) return 0;
  // Fee for small value orders
  const smallOrderSurcharge = calculateSmallOrderSurcharge({ orderValue });
  // Fee based on distance
  const distanceSurcharge = calculateDistanceSurcharge({ distance });
  // Fee based on the amount of items
  const itemCountSurcharge = calculateItemCountSurcharge({ itemCount });

  const totalFee = smallOrderSurcharge + distanceSurcharge + itemCountSurcharge;

  //TODO - RUSH HOUR SURCHARGE

  return totalFee;
};
