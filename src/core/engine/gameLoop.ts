import type { TickContext, UpdateSystem } from './types';

export class GameLoop {
  private systems: UpdateSystem[] = [];

  registerSystem(system: UpdateSystem): void {
    this.systems.push(system);
    this.systems.sort((a, b) => a.priority - b.priority);
  }

  tick(ctx: TickContext): void {
    for (const system of this.systems) {
      system.update(ctx);
    }
  }
}
