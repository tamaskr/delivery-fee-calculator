import { RushHourPeriod } from './../../types/calculator';
import { RUSH_HOURS, RUSH_HOUR_MULTIPLIER } from '../../constants/calculator';
import { RushHourSurchargeCalculatorProps } from '../../types/calculator';

// Calculates an extra fee for orders made within any of the given rush hours
export const calculateRushHourSurcharge = ({
  currentFee,
  time,
  rushHourPeriods = RUSH_HOURS,
  multiplier = RUSH_HOUR_MULTIPLIER,
}: RushHourSurchargeCalculatorProps): number => {
  // Get the day of the week for the passed UTC time
  const dayOfTheWeekInUTC = time.getUTCDay();
  // Convert the current time to HH:MM format in UTC time
  const hoursAndMinutesInUTC = `${time.getUTCHours()}:${time.getUTCMinutes()}`;
  // Check if the time is in any of the rush hour periods
  const isRushHour = rushHourPeriods
    .map((rushHour: RushHourPeriod) => {
      // Check if the day of the week matches
      const isSameDay = dayOfTheWeekInUTC === rushHour.day;
      // Convert start and end dates to HH:MM format
      const startOfPeriod = `${rushHour.from}:00`;
      const endOfPeriod = `${rushHour.to}:00`;
      // Check if the day and the time period both match
      const isInTimePeriod =
        hoursAndMinutesInUTC >= startOfPeriod &&
        hoursAndMinutesInUTC <= endOfPeriod;
      // Return true if both the day and the time period matches
      return isSameDay && isInTimePeriod;
    })
    .includes(true);
  return isRushHour ? currentFee * multiplier : currentFee;
};
