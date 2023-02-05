import moment from 'moment';
import { RushHourPeriod } from '../../types/calculator';
import { RUSH_HOURS, RUSH_HOUR_MULTIPLIER } from '../../constants/calculator';
import { RushHourSurchargeCalculatorProps } from '../../types/calculator';

const VALID_TIME_FORMAT = 'HH:mm';

// Validates rush hour periods
export const validateRushHourPeriods = (rushHourPeriods: RushHourPeriod[]): boolean => {
  // Map out all the values from rush hour periods
  const rushHourPeriodValidity = rushHourPeriods.map(
    (rushHour) =>
      moment(rushHour.from, VALID_TIME_FORMAT, true).isValid() && moment(rushHour.to, VALID_TIME_FORMAT, true).isValid()
  );
  // Return false if rush hour periods contain invalid values
  if (rushHourPeriodValidity.includes(false)) {
    console.error('Invalid rush hour period provided');
    return false;
  }
  // Return true if all the rush hour periods are valid
  return true;
};

// Calculates an extra fee for orders made within rush hour periods
export const calculateRushHourSurcharge = ({
  currentFee,
  time,
  rushHourPeriods = RUSH_HOURS,
  multiplier = RUSH_HOUR_MULTIPLIER,
}: RushHourSurchargeCalculatorProps): number => {
  // Validate all rush hour periods, returns early if invalid
  const areAllRushHourPeriodsValid = validateRushHourPeriods(rushHourPeriods);
  if (!areAllRushHourPeriodsValid) return currentFee;

  // Format time to UTC time zone
  const timeInUTC = moment.utc(time);
  // Get UTC day of the week
  const dayOfTheWeekInUTC = timeInUTC.day();
  // Convert UTC time to HH:mm format
  const hoursAndMinutesInUTC = timeInUTC.format(VALID_TIME_FORMAT);
  // Check if the converted UTC time is in any of the rush hour periods
  const isRushHour = rushHourPeriods
    .map((rushHour: RushHourPeriod) => {
      // Check if day of the week matches
      const isSameDay = dayOfTheWeekInUTC === rushHour.day;
      // Check if given time is in the rush hour's time period
      const isInTimePeriod = hoursAndMinutesInUTC >= rushHour.from && hoursAndMinutesInUTC <= rushHour.to;
      // Return true if both day and time period matches
      return isSameDay && isInTimePeriod;
    })
    .includes(true);
  // Apply multiplier if any of the rush hour periods match the given time
  return isRushHour ? currentFee * multiplier : currentFee;
};
