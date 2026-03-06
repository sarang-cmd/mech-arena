export interface HudViewModel {
  hpPercent: number;
  heatPercent: number;
  ammoInClip: number;
  ammoReserve?: number;
  objectiveText: string;
  warning?: 'overheated' | 'criticalDamage' | 'incomingMissile';
}
