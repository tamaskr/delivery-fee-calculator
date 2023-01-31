import { Days } from '../../../constants/days';
import { RushHourPeriod } from '../../../types/calculator';
import { calculateRushHourSurcharge, checkRushHourPeriodValidity } from '../time';

const CURRENT_FEE_TEST = 10;
const RUSH_HOUR_MULTIPLIER_TEST = 1.2;
const INVALID_RUSH_HOUR_PERIODS_TEST: RushHourPeriod[] = [
  {
    day: Days.Friday,
    // Invalid HH:mm format
    from: '9:44',
    to: '19:00',
  },
];
const VALID_RUSH_HOUR_PERIODS_TEST: RushHourPeriod[] = [
  {
    day: Days.Friday,
    from: '15:00',
    to: '19:00',
  },
];

describe('calculateRushHourSurcharge', () => {
  test('Returns the current fee with multiplier for time in UTC rush hour', () => {
    const result = calculateRushHourSurcharge({
      currentFee: CURRENT_FEE_TEST,
      // Friday 14:59:59 UTC time
      time: new Date('2023-01-27T16:59:99.999+02:00'),
      rushHourPeriods: VALID_RUSH_HOUR_PERIODS_TEST,
      multiplier: RUSH_HOUR_MULTIPLIER_TEST,
    });
    expect(result).toBe(CURRENT_FEE_TEST);
  });

  test('Returns the current fee (without multiplier) for time outside of UTC rush hour', () => {
    const result = calculateRushHourSurcharge({
      currentFee: CURRENT_FEE_TEST,
      // Friday 15:00:00 UTC time
      time: new Date('2023-01-27T17:00:00.000+02:00'),
      rushHourPeriods: VALID_RUSH_HOUR_PERIODS_TEST,
      multiplier: RUSH_HOUR_MULTIPLIER_TEST,
    });
    expect(result).toBe(CURRENT_FEE_TEST * RUSH_HOUR_MULTIPLIER_TEST);
  });
});

describe('checkRushHourPeriodValidity', () => {
  test('Returns true if valid rush hour period is passed', () => {
    const result = checkRushHourPeriodValidity(VALID_RUSH_HOUR_PERIODS_TEST);
    expect(result).toBe(true);
  });

  test('Throws error if invalid rush hour period is passed', () => {
    console.error = jest.fn();
    checkRushHourPeriodValidity(INVALID_RUSH_HOUR_PERIODS_TEST);
    expect(console.error).toHaveBeenCalledWith('Invalid rush hour period provided');
  });
});
