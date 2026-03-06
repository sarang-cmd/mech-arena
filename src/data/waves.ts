export interface WaveSpawn {
  enemyArchetypeId: string;
  count: number;
  spawnDelayMs: number;
}

export interface WaveConfig {
  id: string;
  spawns: WaveSpawn[];
}

export const waveSetVerticalSlice: WaveConfig[] = [
  {
    id: 'wave-1',
    spawns: [
      { enemyArchetypeId: 'enemy-skirmisher', count: 2, spawnDelayMs: 1000 },
      { enemyArchetypeId: 'enemy-artillery', count: 1, spawnDelayMs: 4500 }
    ]
  },
  {
    id: 'wave-2',
    spawns: [
      { enemyArchetypeId: 'enemy-brawler', count: 2, spawnDelayMs: 1000 },
      { enemyArchetypeId: 'enemy-skirmisher', count: 2, spawnDelayMs: 3000 }
    ]
  }
];
