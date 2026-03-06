import { describe, expect, it } from 'vitest';
import { chooseAction } from '../src/gameplay/ai/utilityAi';

describe('chooseAction', () => {
  it('retreats when overheating and low armor', () => {
    const action = chooseAction(
      {
        id: 'enemy-brawler',
        profile: 'brawler',
        aggression: 0.8,
        caution: 0.5,
        preferredRange: 12,
        retreatHeatThreshold: 0.7
      },
      {
        distanceToTarget: 8,
        hasLineOfSight: true,
        selfHeatRatio: 0.92,
        selfArmorRatio: 0.2,
        targetWeakPointExposed: false,
        nearbyCoverScore: 0.4
      }
    );

    expect(['retreat', 'cooldown']).toContain(action);
  });
});
