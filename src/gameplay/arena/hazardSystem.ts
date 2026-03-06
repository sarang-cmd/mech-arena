import type { ArenaConfig } from './types';

export interface HazardTickContext {
  entityId: string;
  activeHazardIds: string[];
  deltaSeconds: number;
}

export interface HazardDamageEvent {
  hazardId: string;
  targetId: string;
  damage: number;
}

export function computeHazardDamageEvents(arena: ArenaConfig, ctx: HazardTickContext): HazardDamageEvent[] {
  const hazards = new Set(ctx.activeHazardIds);
  const events: HazardDamageEvent[] = [];

  for (const hazard of arena.hazards) {
    if (!hazard.enabled || !hazard.damagePerSecond) {
      continue;
    }

    if (!hazards.has(hazard.id)) {
      continue;
    }

    events.push({
      hazardId: hazard.id,
      targetId: ctx.entityId,
      damage: hazard.damagePerSecond * ctx.deltaSeconds
    });
  }

  return events;
}
