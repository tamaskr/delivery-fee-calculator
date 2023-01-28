import { RUSH_HOURS, RUSH_HOUR_MULTIPLIER } from '../../constants/calculator';
import { RushHourSurchargeCalculatorProps } from '../../types/calculator';

// Calculates an extra fee for small orders below a given limit
export const calculateRushHourSurcharge = ({
  currentFee,
  time,
  rushHourPeriods = RUSH_HOURS,
  multiplier = RUSH_HOUR_MULTIPLIER,
}: RushHourSurchargeCalculatorProps): number => {
  //TODO - add rush hour calculation logic
  return 0;
};
