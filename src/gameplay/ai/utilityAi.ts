import type { EnemyBehaviorConfig } from './types';

export type AiAction = 'attack' | 'strafe' | 'push' | 'retreat' | 'seekCover' | 'cooldown';

export interface AiContext {
  distanceToTarget: number;
  hasLineOfSight: boolean;
  selfHeatRatio: number;
  selfArmorRatio: number;
  targetWeakPointExposed: boolean;
  nearbyCoverScore: number;
}

export function scoreActions(config: EnemyBehaviorConfig, ctx: AiContext): Record<AiAction, number> {
  const rangeDelta = Math.abs(ctx.distanceToTarget - config.preferredRange);
  const inRangeScore = Math.max(0, 1 - rangeDelta / Math.max(1, config.preferredRange));

  const attack = (ctx.hasLineOfSight ? 0.6 : 0.2) + inRangeScore * 0.5 + (ctx.targetWeakPointExposed ? 0.3 : 0);
  const strafe = (ctx.hasLineOfSight ? 0.5 : 0.2) + (1 - inRangeScore) * 0.3;
  const push = config.aggression * 0.7 + (ctx.distanceToTarget > config.preferredRange ? 0.4 : 0) - ctx.selfHeatRatio * 0.4;
  const retreat = config.caution * 0.6 + (ctx.selfArmorRatio < 0.35 ? 0.6 : 0) + (ctx.selfHeatRatio > config.retreatHeatThreshold ? 0.8 : 0);
  const seekCover = config.caution * 0.6 + ctx.nearbyCoverScore * 0.5 + (ctx.hasLineOfSight ? 0 : 0.2);
  const cooldown = ctx.selfHeatRatio * 1.2 + (ctx.selfHeatRatio > 0.85 ? 0.6 : 0);

  return { attack, strafe, push, retreat, seekCover, cooldown };
}

export function chooseAction(config: EnemyBehaviorConfig, ctx: AiContext): AiAction {
  const scores = scoreActions(config, ctx);
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'strafe') as AiAction;
}
