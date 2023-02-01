import {
  ADDITIONAL_DISTANCE_FEE,
  ADDITIONAL_DISTANCE_STEP,
  INITIAL_DISTANCE,
  INITIAL_DISTANCE_FEE,
} from '../../../constants/calculator';
import { calculateDistanceSurcharge } from '../distance';

const INITIAL_DISTANCE_TEST = 500;
const INITIAL_DISTANCE_FEE_TEST = 3.5;
const ADDITIONAL_DISTANCE_STEP_TEST = 100;
const ADDITIONAL_DISTANCE_FEE_TEST = 1.5;

describe('calculateDistanceSurcharge', () => {
  test('Returns the initial distance fee for distance no larger than the initial distance', () => {
    const result = calculateDistanceSurcharge({ distance: INITIAL_DISTANCE });
    expect(result).toBe(INITIAL_DISTANCE_FEE);
  });

  test('Calculates the distance surcharge for a distance larger than initial distance', () => {
    const result = calculateDistanceSurcharge({ distance: INITIAL_DISTANCE + ADDITIONAL_DISTANCE_STEP });
    expect(result).toBe(INITIAL_DISTANCE_FEE + ADDITIONAL_DISTANCE_FEE);
  });

  test('Calculates the distance surcharge for distance one unit less than the first additional distance step', () => {
    const result = calculateDistanceSurcharge({
      distance: INITIAL_DISTANCE_TEST + ADDITIONAL_DISTANCE_STEP_TEST - 1,
      initialDistance: INITIAL_DISTANCE_TEST,
      initialFee: INITIAL_DISTANCE_FEE_TEST,
      additionalDistanceSteps: ADDITIONAL_DISTANCE_STEP_TEST,
      additionalFee: ADDITIONAL_DISTANCE_FEE_TEST,
    });
    expect(result).toBe(INITIAL_DISTANCE_FEE_TEST + ADDITIONAL_DISTANCE_FEE_TEST);
  });

  test('Calculates the distance surcharge for distance one unit over the first additional distance step', () => {
    const result = calculateDistanceSurcharge({
      distance: INITIAL_DISTANCE_TEST + ADDITIONAL_DISTANCE_STEP_TEST + 1,
      initialDistance: INITIAL_DISTANCE_TEST,
      initialFee: INITIAL_DISTANCE_FEE_TEST,
      additionalDistanceSteps: ADDITIONAL_DISTANCE_STEP_TEST,
      additionalFee: ADDITIONAL_DISTANCE_FEE_TEST,
    });
    expect(result).toBe(INITIAL_DISTANCE_FEE_TEST + 2 * ADDITIONAL_DISTANCE_FEE_TEST);
  });
});
