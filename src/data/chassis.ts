import type { ChassisSpec } from '../gameplay/mech/types';

export const chassisCatalog: ChassisSpec[] = [
  {
    id: 'chassis-vanguard-mk1',
    name: 'Vanguard MK-I',
    class: 'medium',
    massLimit: 105,
    powerBudget: 130,
    mobility: {
      walkSpeed: 6.2,
      strafeSpeed: 5.1,
      turnRate: 84,
      boostCapacity: 100,
      boostRegenPerSecond: 18
    },
    heat: {
      maxHeat: 120,
      passiveCoolingPerSecond: 14
    },
    baseParts: {
      torso: { maxArmor: 900, maxStructure: 600 },
      core: { maxArmor: 600, maxStructure: 500 },
      leftArm: { maxArmor: 320, maxStructure: 180 },
      rightArm: { maxArmor: 320, maxStructure: 180 },
      legs: { maxArmor: 500, maxStructure: 320 }
    }
  }
];
