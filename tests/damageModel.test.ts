import { describe, expect, it } from 'vitest';
import { applyLocalizedDamage } from '../src/gameplay/mech/damageModel';

describe('applyLocalizedDamage', () => {
  it('consumes armor before structure', () => {
    const part = {
      maxArmor: 100,
      maxStructure: 80,
      currentArmor: 40,
      currentStructure: 50,
      operational: true
    };

    const result = applyLocalizedDamage(part, 60);

    expect(result.armorDamage).toBe(40);
    expect(result.structureDamage).toBe(20);
    expect(part.currentArmor).toBe(0);
    expect(part.currentStructure).toBe(30);
    expect(part.operational).toBe(true);
  });

  it('marks part destroyed when structure reaches zero', () => {
    const part = {
      maxArmor: 20,
      maxStructure: 10,
      currentArmor: 0,
      currentStructure: 10,
      operational: true
    };

    const result = applyLocalizedDamage(part, 12);

    expect(result.partDestroyed).toBe(true);
    expect(part.currentStructure).toBe(0);
    expect(part.operational).toBe(false);
  });
});
