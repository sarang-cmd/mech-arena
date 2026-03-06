import type { MechState } from './mechState';

export interface HeatTickResult {
  currentHeat: number;
  overheated: boolean;
}

export function addHeat(mech: MechState, amount: number): HeatTickResult {
  mech.currentHeat = Math.min(mech.chassis.heat.maxHeat, mech.currentHeat + amount);
  return {
    currentHeat: mech.currentHeat,
    overheated: mech.currentHeat >= mech.chassis.heat.maxHeat
  };
}

export function coolHeat(mech: MechState, deltaSeconds: number): HeatTickResult {
  const cooling = mech.chassis.heat.passiveCoolingPerSecond * mech.modifiers.coolingMultiplier * deltaSeconds;
  mech.currentHeat = Math.max(0, mech.currentHeat - cooling);
  return {
    currentHeat: mech.currentHeat,
    overheated: mech.currentHeat >= mech.chassis.heat.maxHeat
  };
}

export function canFire(mech: MechState, weaponHeatPerShot: number): boolean {
  return mech.currentHeat + weaponHeatPerShot <= mech.chassis.heat.maxHeat;
}
