export type HazardType = 'lavaVent' | 'electricField' | 'movingGate' | 'collapsibleFloor' | 'orbitalZone';

export interface ArenaHazard {
  id: string;
  type: HazardType;
  enabled: boolean;
  damagePerSecond?: number;
}

export interface ArenaConfig {
  id: string;
  name: string;
  hazards: ArenaHazard[];
  destructibleCoverCount: number;
  objectiveNodes: string[];
}
