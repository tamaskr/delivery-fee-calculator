import { RushHourPeriod } from '../types/calculator';
import { Days } from './days';

// Minimum order value to avoid small order surcharge (euros)
export const SMALL_ORDER_LIMIT = 10;

// Minimum order value to qualify for free shipping (euros)
export const FREE_DELIVERY_TRESHOLD = 100;
// Minimum amount to be charged for shipping (euros)
export const DELIVERY_FEE_CAP = 15;

// Initial distance that is included in the initial charge (meters)
export const INITIAL_DISTANCE = 1000;
// Default distance fee for all orders (euros)
export const INITIAL_DISTANCE_FEE = 2;
// Distance step for charging extra fee over the initial distance (meters)
export const ADDITIONAL_DISTANCE_STEP = 500;
// Fee to be charged for each additional distance step passed (euros)
export const ADDITIONAL_DISTANCE_FEE = 1;

// Amount of items that holds no extra charge (piece)
export const FREE_ITEM_LIMIT = 4;
// Fee for any amount of items that is over the free limit (euros)
export const EXTRA_ITEM_FEE = 0.5;
// Amount of items, which make the order qualify for large order surcharge (piece)
export const LARGE_ORDER_LIMIT = 13;
// Fee to be charged for large orders above the limit (euros)
export const LARGE_ORDER_FEE = 1.2;

// Values should be multiplied with the rush hour multiplier if applicable
export const RUSH_HOUR_MULTIPLIER = 1.2;
// Time period when the extra rush hour surcharge can be applied
export const RUSH_HOURS: RushHourPeriod[] = [
  {
    day: Days.Friday,
    from: 15,
    to: 19,
  },
];
