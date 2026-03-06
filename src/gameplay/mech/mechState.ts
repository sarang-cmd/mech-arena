import type { ChassisSpec, MechPartState, MechLoadout, SlotType } from './types';
import { applyLocalizedDamage } from './damageModel';

export type PartId = 'torso' | 'core' | 'leftArm' | 'rightArm' | 'legs';

export interface CombatModifiers {
  mobilityMultiplier: number;
  turnRateMultiplier: number;
  coolingMultiplier: number;
}

export interface MechState {
  id: string;
  chassis: ChassisSpec;
  loadout: MechLoadout;
  parts: Record<PartId, MechPartState>;
  currentHeat: number;
  destroyed: boolean;
  disabledSlots: Set<SlotType>;
  modifiers: CombatModifiers;
}

export interface PartDamageApplication {
  part: PartId;
  amount: number;
}

export interface DamageApplicationResult {
  armorDamage: number;
  structureDamage: number;
  partDestroyed: boolean;
  mechDestroyed: boolean;
  newlyDisabledSlots: SlotType[];
}

const PART_TO_SLOT_DISABLE: Record<PartId, SlotType[]> = {
  torso: ['back', 'utility'],
  core: ['leftArm', 'rightArm', 'shoulderLeft', 'shoulderRight', 'back', 'utility'],
  leftArm: ['leftArm', 'shoulderLeft'],
  rightArm: ['rightArm', 'shoulderRight'],
  legs: []
};

function computeModifiers(parts: Record<PartId, MechPartState>): CombatModifiers {
  const legsHealthy = parts.legs.operational;
  const torsoHealthy = parts.torso.operational;

  const torsoIntegrity = parts.torso.currentStructure / parts.torso.maxStructure;
  const coolingMultiplier = torsoHealthy ? Math.max(0.45, torsoIntegrity) : 0.35;

  return {
    mobilityMultiplier: legsHealthy ? 1 : 0.45,
    turnRateMultiplier: torsoHealthy ? 1 : 0.7,
    coolingMultiplier
  };
}

export function createMechState(id: string, chassis: ChassisSpec, loadout: MechLoadout): MechState {
  const parts: Record<PartId, MechPartState> = {
    torso: {
      ...chassis.baseParts.torso,
      currentArmor: chassis.baseParts.torso.maxArmor,
      currentStructure: chassis.baseParts.torso.maxStructure,
      operational: true
    },
    core: {
      ...chassis.baseParts.core,
      currentArmor: chassis.baseParts.core.maxArmor,
      currentStructure: chassis.baseParts.core.maxStructure,
      operational: true
    },
    leftArm: {
      ...chassis.baseParts.leftArm,
      currentArmor: chassis.baseParts.leftArm.maxArmor,
      currentStructure: chassis.baseParts.leftArm.maxStructure,
      operational: true
    },
    rightArm: {
      ...chassis.baseParts.rightArm,
      currentArmor: chassis.baseParts.rightArm.maxArmor,
      currentStructure: chassis.baseParts.rightArm.maxStructure,
      operational: true
    },
    legs: {
      ...chassis.baseParts.legs,
      currentArmor: chassis.baseParts.legs.maxArmor,
      currentStructure: chassis.baseParts.legs.maxStructure,
      operational: true
    }
  };

  return {
    id,
    chassis,
    loadout,
    parts,
    currentHeat: 0,
    destroyed: false,
    disabledSlots: new Set(),
    modifiers: computeModifiers(parts)
  };
}

export function applyDamageToMech(mech: MechState, incoming: PartDamageApplication): DamageApplicationResult {
  const partState = mech.parts[incoming.part];
  const damageResult = applyLocalizedDamage(partState, incoming.amount);

  const newlyDisabledSlots: SlotType[] = [];
  if (damageResult.partDestroyed) {
    for (const slot of PART_TO_SLOT_DISABLE[incoming.part]) {
      if (!mech.disabledSlots.has(slot)) {
        mech.disabledSlots.add(slot);
        newlyDisabledSlots.push(slot);
      }
    }
  }

  mech.modifiers = computeModifiers(mech.parts);

  if (!mech.parts.core.operational) {
    mech.destroyed = true;
  }

  return {
    ...damageResult,
    mechDestroyed: mech.destroyed,
    newlyDisabledSlots
  };
}
