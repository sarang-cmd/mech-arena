import { describe, expect, it } from 'vitest';
import { chassisCatalog } from '../src/data/chassis';
import { weaponCatalog } from '../src/data/weapons';
import { validateLoadout } from '../src/gameplay/weapons/loadoutValidator';

describe('validateLoadout', () => {
  it('accepts compatible weapons within mass/power budget', () => {
    const result = validateLoadout(
      {
        chassisId: chassisCatalog[0].id,
        slots: {
          leftArm: 'wpn-ar-pulse-25',
          rightArm: 'wpn-lc-arcbeam',
          shoulderLeft: 'wpn-ml-hydra'
        }
      },
      chassisCatalog[0],
      weaponCatalog
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects slot-incompatible assignments', () => {
    const result = validateLoadout(
      {
        chassisId: chassisCatalog[0].id,
        slots: {
          shoulderRight: 'wpn-ar-pulse-25'
        }
      },
      chassisCatalog[0],
      weaponCatalog
    );

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('cannot be equipped');
  });
});
