import { RushHourPeriod } from '../types/calculator';
import { Days } from './days';

// Minimum order value, which doesn't incur small order surcharge (euros)
export const SMALL_ORDER_LIMIT = 10;

// Minimum order value for free shipping (euros)
export const FREE_DELIVERY_TRESHOLD = 100;
// Maximum amount to be charged for delivery fee (euros)
export const DELIVERY_FEE_CAP = 15;

// Initial distance included in the initial distance charge (meters)
export const INITIAL_DISTANCE = 1000;
// Default distance fee for all orders (euros)
export const INITIAL_DISTANCE_FEE = 2;
// Distance step for extra fee over the initial distance (meters)
export const ADDITIONAL_DISTANCE_STEP = 500;
// Fee for each additional distance step passed (euros)
export const ADDITIONAL_DISTANCE_FEE = 1;

// Maximum amount of items without added fee (piece)
export const FREE_ITEM_LIMIT = 4;
// Fee for each item over the free limit (euros)
export const EXTRA_ITEM_FEE = 0.5;
// Minimum mount of items to qualify for large order fee (piece)
export const LARGE_ORDER_LIMIT = 13;
// Fee to be charged for orders passing the item amount limit (euros)
export const LARGE_ORDER_FEE = 1.2;

// Multiplier for orders made in rush hours
export const RUSH_HOUR_MULTIPLIER = 1.2;
// Time periods when the rush hour multiplier can be applied
export const RUSH_HOURS: RushHourPeriod[] = [
  {
    day: Days.Friday,
    from: 15,
    to: 19,
  },
];
