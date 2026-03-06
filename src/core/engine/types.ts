export interface TickContext {
  deltaMs: number;
  nowMs: number;
}

export interface UpdateSystem {
  name: string;
  priority: number;
  update(ctx: TickContext): void;
}
