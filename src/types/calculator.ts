import { Days } from '../constants/days';

export type CalculatorProps = {
  orderValue: number;
  distance: number;
  itemCount: number;
  time: Date;
  freeDeliveryTreshold?: number;
  deliveryFeeCap?: number;
};

export type SmallOrderSurchargeCalculatorProps = {
  orderValue: number;
  smallOrderLimit?: number;
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
  from: string;
  to: string;
};

export type RushHourSurchargeCalculatorProps = {
  currentFee: number;
  time: Date;
  rushHourPeriods?: RushHourPeriod[];
  multiplier?: number;
};
