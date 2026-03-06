export type EventPayloadMap = Record<string, unknown>;

export class EventBus<TEvents extends EventPayloadMap> {
  private listeners = new Map<keyof TEvents, Set<(payload: any) => void>>();

  on<TKey extends keyof TEvents>(type: TKey, handler: (payload: TEvents[TKey]) => void): () => void {
    const set = this.listeners.get(type) ?? new Set();
    set.add(handler as (payload: any) => void);
    this.listeners.set(type, set);
    return () => this.off(type, handler);
  }

  off<TKey extends keyof TEvents>(type: TKey, handler: (payload: TEvents[TKey]) => void): void {
    const set = this.listeners.get(type);
    if (!set) return;
    set.delete(handler as (payload: any) => void);
    if (set.size === 0) this.listeners.delete(type);
  }

  emit<TKey extends keyof TEvents>(type: TKey, payload: TEvents[TKey]): void {
    const set = this.listeners.get(type);
    if (!set) return;
    for (const handler of set) handler(payload);
  }
}
