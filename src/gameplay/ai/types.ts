export type TacticalProfile = 'sniper' | 'brawler' | 'flanker' | 'balanced';

export interface EnemyBehaviorConfig {
  id: string;
  profile: TacticalProfile;
  aggression: number;
  caution: number;
  preferredRange: number;
  retreatHeatThreshold: number;
}
