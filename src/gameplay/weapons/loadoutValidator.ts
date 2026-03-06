import type { MechLoadout, SlotType } from '../mech/types';
import type { ChassisSpec } from '../mech/types';
import type { WeaponSpec } from './types';

export interface LoadoutValidationResult {
  valid: boolean;
  totalMass: number;
  totalPowerDraw: number;
  errors: string[];
}

const SLOT_TO_TAG: Record<SlotType, string> = {
  leftArm: 'leftArm',
  rightArm: 'rightArm',
  shoulderLeft: 'shoulderLeft',
  shoulderRight: 'shoulderRight',
  back: 'back',
  utility: 'utility'
};

export function validateLoadout(
  loadout: MechLoadout,
  chassis: ChassisSpec,
  weapons: WeaponSpec[]
): LoadoutValidationResult {
  const byId = new Map(weapons.map((weapon) => [weapon.id, weapon]));
  const errors: string[] = [];

  let totalMass = 0;
  let totalPowerDraw = 0;

  for (const [slot, weaponId] of Object.entries(loadout.slots) as [SlotType, string][]) {
    const weapon = byId.get(weaponId);
    if (!weapon) {
      errors.push(`Unknown weapon in slot ${slot}: ${weaponId}`);
      continue;
    }

    const expectedTag = SLOT_TO_TAG[slot];
    if (!weapon.slotTags.includes(expectedTag)) {
      errors.push(`Weapon ${weapon.id} cannot be equipped in ${slot}`);
    }

    totalMass += weapon.mass;
    totalPowerDraw += weapon.powerDraw;
  }

  if (totalMass > chassis.massLimit) {
    errors.push(`Loadout mass ${totalMass} exceeds chassis limit ${chassis.massLimit}`);
  }

  if (totalPowerDraw > chassis.powerBudget) {
    errors.push(`Loadout power ${totalPowerDraw} exceeds chassis budget ${chassis.powerBudget}`);
  }

  return {
    valid: errors.length === 0,
    totalMass,
    totalPowerDraw,
    errors
  };
}
