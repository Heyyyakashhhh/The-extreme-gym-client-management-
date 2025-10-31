
import { PlanType } from './types';

export const PLAN_PRICES: Record<PlanType, number> = {
  [PlanType.ONE_MONTH]: 999,
  [PlanType.THREE_MONTHS]: 2999,
  [PlanType.SIX_MONTHS]: 5999,
  [PlanType.TWELVE_MONTHS]: 11999,
};

export const PLAN_DURATIONS_MONTHS: Record<PlanType, number> = {
  [PlanType.ONE_MONTH]: 1,
  [PlanType.THREE_MONTHS]: 3,
  [PlanType.SIX_MONTHS]: 6,
  [PlanType.TWELVE_MONTHS]: 12,
};
   