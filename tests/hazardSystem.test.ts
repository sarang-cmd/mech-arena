import { describe, expect, it } from 'vitest';
import { arenaVerticalSlice } from '../src/data/arena';
import { computeHazardDamageEvents } from '../src/gameplay/arena/hazardSystem';

describe('computeHazardDamageEvents', () => {
  it('emits damage events only for active damaging hazards', () => {
    const events = computeHazardDamageEvents(arenaVerticalSlice, {
      entityId: 'player-1',
      activeHazardIds: ['hz-lava-1', 'hz-gate-1'],
      deltaSeconds: 0.5
    });

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      hazardId: 'hz-lava-1',
      targetId: 'player-1',
      damage: 47.5
    });
  });
});
