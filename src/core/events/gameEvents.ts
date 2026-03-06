export type MechPartId = 'torso' | 'core' | 'leftArm' | 'rightArm' | 'legs';

export interface GameEvents {
  damageApplied: {
    targetId: string;
    part: MechPartId;
    amount: number;
    sourceId: string;
  };
  heatChanged: {
    mechId: string;
    currentHeat: number;
    maxHeat: number;
    overheated: boolean;
  };
  mechDestroyed: {
    mechId: string;
    killerId?: string;
  };
  objectiveProgress: {
    objectiveId: string;
    teamId: string;
    progress: number;
  };
}
