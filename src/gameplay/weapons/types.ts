export type WeaponKind = 'projectile' | 'hitscan' | 'beam' | 'missile' | 'aoe';

export interface WeaponSpec {
  id: string;
  name: string;
  kind: WeaponKind;
  slotTags: string[];
  mass: number;
  powerDraw: number;
  heatPerShot: number;
  cooldownMs: number;
  ammoCapacity?: number;
  damage: number;
  price: number;
}
