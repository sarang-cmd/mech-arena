import type { WeaponSpec } from '../gameplay/weapons/types';

export const weaponCatalog: WeaponSpec[] = [
  {
    id: 'wpn-ar-pulse-25',
    name: 'Pulse Rifle 25',
    kind: 'hitscan',
    slotTags: ['leftArm', 'rightArm'],
    mass: 18,
    powerDraw: 20,
    heatPerShot: 4,
    cooldownMs: 120,
    ammoCapacity: 220,
    damage: 35,
    price: 2800
  },
  {
    id: 'wpn-ml-hydra',
    name: 'Hydra Micro Missiles',
    kind: 'missile',
    slotTags: ['shoulderLeft', 'shoulderRight'],
    mass: 24,
    powerDraw: 26,
    heatPerShot: 8,
    cooldownMs: 500,
    ammoCapacity: 48,
    damage: 90,
    price: 4200
  },
  {
    id: 'wpn-lc-arcbeam',
    name: 'Arc Beam Cutter',
    kind: 'beam',
    slotTags: ['leftArm', 'rightArm'],
    mass: 20,
    powerDraw: 32,
    heatPerShot: 12,
    cooldownMs: 180,
    damage: 55,
    price: 5100
  }
];
