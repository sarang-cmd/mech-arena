import type { ArenaConfig } from '../gameplay/arena/types';

export const arenaVerticalSlice: ArenaConfig = {
  id: 'arena-volcanic-foundry',
  name: 'Volcanic Foundry',
  hazards: [
    { id: 'hz-lava-1', type: 'lavaVent', enabled: true, damagePerSecond: 95 },
    { id: 'hz-gate-1', type: 'movingGate', enabled: true },
    { id: 'hz-orbital-1', type: 'orbitalZone', enabled: true, damagePerSecond: 240 }
  ],
  destructibleCoverCount: 18,
  objectiveNodes: ['alpha-relay', 'beta-relay', 'repair-bay-east']
};
