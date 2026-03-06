import { describe, expect, it } from 'vitest';
import { calculateRewards } from '../src/meta/progression';

describe('calculateRewards', () => {
  it('rewards strong performance with high grade', () => {
    const rewards = calculateRewards({
      completionSeconds: 60,
      accuracyPercent: 95,
      damageTaken: 80,
      styleScore: 260
    });

    expect(rewards.credits).toBeGreaterThan(1000);
    expect(rewards.researchPoints).toBeGreaterThan(150);
    expect(['A', 'S']).toContain(rewards.grade);
  });
});
