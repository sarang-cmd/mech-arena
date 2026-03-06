import { describe, expect, it } from 'vitest';
import { chassisCatalog } from '../src/data/chassis';
import { createMechState, applyDamageToMech } from '../src/gameplay/mech/mechState';
import { coolHeat, addHeat, canFire } from '../src/gameplay/mech/heatSystem';

describe('mechState damage + heat integration', () => {
  it('disables left-arm slots when left arm is destroyed', () => {
    const mech = createMechState('player-1', chassisCatalog[0], {
      chassisId: chassisCatalog[0].id,
      slots: { leftArm: 'wpn-ar-pulse-25', shoulderLeft: 'wpn-ml-hydra' }
    });

    const result = applyDamageToMech(mech, {
      part: 'leftArm',
      amount: mech.parts.leftArm.maxArmor + mech.parts.leftArm.maxStructure + 1
    });

    expect(result.partDestroyed).toBe(true);
    expect(result.newlyDisabledSlots).toEqual(expect.arrayContaining(['leftArm', 'shoulderLeft']));
    expect(mech.disabledSlots.has('leftArm')).toBe(true);
  });

  it('applies cooling penalty when torso structure is critically low', () => {
    const mech = createMechState('player-2', chassisCatalog[0], {
      chassisId: chassisCatalog[0].id,
      slots: {}
    });

    addHeat(mech, 80);
    const baseCoolingTick = coolHeat(mech, 1).currentHeat;

    // restore and then destroy torso structure for penalty path
    mech.currentHeat = 80;
    applyDamageToMech(mech, {
      part: 'torso',
      amount: mech.parts.torso.maxArmor + mech.parts.torso.maxStructure
    });
    const degradedCoolingTick = coolHeat(mech, 1).currentHeat;

    expect(degradedCoolingTick).toBeGreaterThan(baseCoolingTick);
  });

  it('blocks firing once heat cap would be exceeded', () => {
    const mech = createMechState('player-3', chassisCatalog[0], {
      chassisId: chassisCatalog[0].id,
      slots: {}
    });

    addHeat(mech, mech.chassis.heat.maxHeat - 2);
    expect(canFire(mech, 1)).toBe(true);
    expect(canFire(mech, 3)).toBe(false);
  });
});
