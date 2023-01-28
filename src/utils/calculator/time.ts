import * as moment from 'moment';
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
  // Format the given time to UTC time zone
  const timeInUTC = moment.utc(time);
  // Get the day of the week for the passed UTC time
  const dayOfTheWeekInUTC = timeInUTC.day();
  // Convert the current time to hh:mm format in UTC time
  const hoursAndMinutesInUTC = timeInUTC.format('HH:mm');
  // Check if the time is in any of the rush hour periods
  const isRushHour = rushHourPeriods
    .map((rushHour: RushHourPeriod) => {
      // Check if the day of the week matches
      const isSameDay = dayOfTheWeekInUTC === rushHour.day;
      // Check if the day and the time period both match
      const isInTimePeriod =
        hoursAndMinutesInUTC >= rushHour.from &&
        hoursAndMinutesInUTC <= rushHour.to;
      // Return true if both the day and the time period matches
      return isSameDay && isInTimePeriod;
    })
    // If any of the rush hour periods match with the given time,
    // the value for isRushHour will be true
    .includes(true);
  return isRushHour ? currentFee * multiplier : currentFee;
};
