import type { MechPartState } from './types';

export interface DamageResult {
  armorDamage: number;
  structureDamage: number;
  partDestroyed: boolean;
}

export function applyLocalizedDamage(part: MechPartState, amount: number): DamageResult {
  const armorDamage = Math.min(part.currentArmor, amount);
  part.currentArmor -= armorDamage;

  const spillover = Math.max(0, amount - armorDamage);
  const structureDamage = Math.min(part.currentStructure, spillover);
  part.currentStructure -= structureDamage;

  if (part.currentStructure <= 0) {
    part.operational = false;
  }

  return {
    armorDamage,
    structureDamage,
    partDestroyed: !part.operational
  };
}
