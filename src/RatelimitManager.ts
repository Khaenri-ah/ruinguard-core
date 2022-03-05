import { Collection } from 'discord.js';

export interface RatelimitOptions {
  /** Ratelimit interval in milliseconds */
  duration: number,
  /** Amount of allowed calls per duration */
  limit: number,
}

export interface Ratelimit {
  /** The time this ratelimit resets at */
  t: number,
  /** How many calls are left in this interval */
  l: number,
  /** User-defined data added in calls */
  c: any[],
}

export class RatelimitManager {
  /** The settings for this ratelimit manager */
  limit: RatelimitOptions;
  /** All currently managed limits */
  cache: Collection<any, Ratelimit>;

  /**
   * Creates a new ratelimit manager
   * @param limit Settings for this ratelimit manager
   */
  constructor(limit: RatelimitOptions) {
    this.limit = limit;
    this.cache = new Collection<any, Ratelimit>();
  }

  /** Gets a ratelimit object directly */
  get(id: any) {
    return this.cache.ensure(id, () => ({ t: Date.now() + this.limit.duration, l: this.limit.limit, c: [] }));
  }

  /** Sets a ratelimit object directly */
  set(id: any, data: Ratelimit) {
    this.cache.set(id, data);
  }

  /**
   * Checks if something is ratelimited without counting as a call
   * @param id An identifier of what you want to ratelimit
   * @returns A ratelimit object, if ratelimited
   */
  check(id: any) {
    const limit = this.get(id);
    return (limit.l <= 0 && limit.t >= Date.now()) && limit;
  }

  /**
   * Calls this ratelimit
   * @param id An identifier of what you want to ratelimit
   * @param cache Additional data to store
   * @returns A ratelimit object, if ratelimited
   */
  call(id: any, cache?: any) {
    const lim = this.get(id);
    if (lim.t < Date.now()) {
      lim.t = Date.now() + this.limit.duration;
      lim.l = this.limit.limit;
      lim.c = [];
    }
    lim.l--;
    if (cache) lim.c.push(cache);
    return this.check(id);
  }


  /**
   * Resets a ratelimit
   * @param id An identifier of what you want to ratelimit
   */
  clear(id: any) {
    return this.cache.delete(id);
  }
}