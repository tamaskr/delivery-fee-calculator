import { Days } from '../constants/days';

export type CalculatorProps = {
  orderValue: number;
  distance: number;
  itemCount: number;
  time: string;
  freeDeliveryTreshold?: number;
  deliveryFeeCap?: number;
};

export type SmallOrderSurchargeCalculatorProps = {
  orderValue: number;
  minOrderValue?: number;
};

export type DistanceSurchargeCalculatorProps = {
  distance: number;
  initialDistance?: number;
  initialFee?: number;
  additionalDistanceSteps?: number;
  additionalFee?: number;
};

export type ItemCountSurchargeCalculatorProps = {
  itemCount: number;
  freeItemLimit?: number;
  extraItemFee?: number;
  largeOrderLimit?: number;
  largeOrderFee?: number;
};

export type RushHourPeriod = {
  day: Days;
  from: number;
  to: number;
};

export type RushHourSurchargeCalculatorProps = {
  currentFee: number;
  time: string;
  rushHourPeriods?: RushHourPeriod[];
  multiplier?: number;
};
