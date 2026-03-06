export interface RewardBreakdown {
  credits: number;
  researchPoints: number;
  grade: 'D' | 'C' | 'B' | 'A' | 'S';
}

export interface MissionPerformance {
  completionSeconds: number;
  accuracyPercent: number;
  damageTaken: number;
  styleScore: number;
}

export function calculateRewards(perf: MissionPerformance): RewardBreakdown {
  const speedBonus = Math.max(0, 300 - perf.completionSeconds);
  const accuracyBonus = perf.accuracyPercent * 2;
  const mitigationBonus = Math.max(0, 1000 - perf.damageTaken) * 0.05;
  const styleBonus = perf.styleScore * 1.5;

  const credits = Math.floor(800 + speedBonus + accuracyBonus + mitigationBonus + styleBonus);
  const researchPoints = Math.floor(120 + perf.styleScore * 0.2 + perf.accuracyPercent * 0.4);

  const totalScore = speedBonus + accuracyBonus + mitigationBonus + styleBonus;
  const grade: RewardBreakdown['grade'] =
    totalScore >= 900 ? 'S' :
    totalScore >= 700 ? 'A' :
    totalScore >= 500 ? 'B' :
    totalScore >= 300 ? 'C' : 'D';

  return { credits, researchPoints, grade };
}
