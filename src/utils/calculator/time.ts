import moment from 'moment';
import { RushHourPeriod } from '../../types/calculator';
import { RUSH_HOURS, RUSH_HOUR_MULTIPLIER } from '../../constants/calculator';
import { RushHourSurchargeCalculatorProps } from '../../types/calculator';

const VALID_TIME_FORMAT = 'HH:mm';

// Checks if the given rush hour periods are in valid format
export const checkRushHourPeriodValidity = (rushHourPeriods: RushHourPeriod[]): boolean => {
  // Map out all the supposed HH:mm values from rush hour periods
  const rushHourPeriodValidity = rushHourPeriods.map(
    (rushHour) =>
      moment(rushHour.from, VALID_TIME_FORMAT, true).isValid() && moment(rushHour.to, VALID_TIME_FORMAT, true).isValid()
  );
  // Return false if invalid values are passed to rush hour periods
  if (rushHourPeriodValidity.includes(false)) {
    console.error('Invalid rush hour period provided');
    return false;
  }
  // Return true if all the rush hour period values are valid
  return true;
};

// Calculates an extra fee for orders made within the given rush hour periods
export const calculateRushHourSurcharge = ({
  currentFee,
  time,
  rushHourPeriods = RUSH_HOURS,
  multiplier = RUSH_HOUR_MULTIPLIER,
}: RushHourSurchargeCalculatorProps): number => {
  // Check if all rush hour periods are in valid HH:mm format
  const areAllRushHourPeriodsValid = checkRushHourPeriodValidity(rushHourPeriods);
  // Return early if invalid values are passed to rush hour periods
  if (!areAllRushHourPeriodsValid) return currentFee;
  // Format the given time to UTC time zone
  const timeInUTC = moment.utc(time);
  // Get UTC day of the week
  const dayOfTheWeekInUTC = timeInUTC.day();
  // Convert UTC time to HH:mm format
  const hoursAndMinutesInUTC = timeInUTC.format(VALID_TIME_FORMAT);
  // Check if the converted UTC time is in any of the rush hour periods
  const isRushHour = rushHourPeriods
    .map((rushHour: RushHourPeriod) => {
      // Check if the day of the week matches
      const isSameDay = dayOfTheWeekInUTC === rushHour.day;
      // Check if the given UTC time is in the rush hour's time period
      const isInTimePeriod = hoursAndMinutesInUTC >= rushHour.from && hoursAndMinutesInUTC <= rushHour.to;
      // Return true if both the day and the time period matches
      return isSameDay && isInTimePeriod;
    })
    .includes(true);
  // Apply the multiplier if any of the rush hour periods match the given time
  return isRushHour ? currentFee * multiplier : currentFee;
};
