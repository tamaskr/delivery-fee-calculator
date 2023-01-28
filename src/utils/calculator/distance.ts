import {
  ADDITIONAL_DISTANCE_FEE,
  ADDITIONAL_DISTANCE_STEP,
  INITIAL_DISTANCE,
  INITIAL_DISTANCE_FEE,
} from '../../constants/calculator';
import { DistanceSurchargeCalculatorProps } from '../../types/calculator';

/*
  Calculates the distance surcharge
   - the initial fee is always added
   - additional distance fee will be calculated on top
*/
export const calculateDistanceSurcharge = ({
  distance,
  initialDistance = INITIAL_DISTANCE,
  initialFee = INITIAL_DISTANCE_FEE,
  additionalDistanceSteps = ADDITIONAL_DISTANCE_STEP,
  additionalFee = ADDITIONAL_DISTANCE_FEE,
}: DistanceSurchargeCalculatorProps): number => {
  // Check if the distance is over the initial distance
  const additionalDistance = distance - initialDistance;
  // Calculate charge for the initial distance
  const additionalCharge =
    additionalDistance > 0
      ? Math.ceil(additionalDistance / additionalDistanceSteps)
      : 0;
  return initialFee + additionalCharge * additionalFee;
};
