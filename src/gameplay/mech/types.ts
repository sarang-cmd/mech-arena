export type ChassisClass = 'light' | 'medium' | 'heavy' | 'reverse-joint' | 'tank' | 'hover';

export type SlotType = 'leftArm' | 'rightArm' | 'shoulderLeft' | 'shoulderRight' | 'back' | 'utility';

export interface ResourceStats {
  maxArmor: number;
  maxStructure: number;
}

export interface MechPartState extends ResourceStats {
  currentArmor: number;
  currentStructure: number;
  operational: boolean;
}

export interface MobilityStats {
  walkSpeed: number;
  strafeSpeed: number;
  turnRate: number;
  boostCapacity: number;
  boostRegenPerSecond: number;
}

export interface HeatStats {
  maxHeat: number;
  passiveCoolingPerSecond: number;
}

export interface ChassisSpec {
  id: string;
  name: string;
  class: ChassisClass;
  massLimit: number;
  powerBudget: number;
  mobility: MobilityStats;
  heat: HeatStats;
  baseParts: Record<'torso' | 'core' | 'leftArm' | 'rightArm' | 'legs', ResourceStats>;
}

export interface MechLoadout {
  chassisId: string;
  slots: Partial<Record<SlotType, string>>;
  paintId?: string;
  decalIds?: string[];
}
