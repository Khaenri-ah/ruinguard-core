import { Collection } from 'discord.js';

interface LimitOptions {
  duration: number,
  limit: number,
}

interface Limit {
  t: number,
  l: number,
  c: any[],
}

export default class RatelimitManager {
  limits: LimitOptions[];
  cache: Collection<any, Limit[]>;

  constructor(limits: LimitOptions[]) {
    if (!Array.isArray(limits)) limits = [limits];
    this.limits = limits;
    this.cache = new Collection<any, Limit[]>();
  }

  get(id: any) {
    return this.cache.ensure(id, () => this.limits.map(limit => ({ t: Date.now() + limit.duration, l: limit.limit, c: [] }) as Limit));
  }

  set(id: any, limit: number, data: Limit) {
    this.get(id)[limit] = data;
  }

  check(id: any) {
    return this.get(id).find(l => l.l <= 0 && l.t >= Date.now());
  }

  call(id: any, { limit = 0, cache }: { limit?: number, cache?: any } = {}) {
    const lim = this.get(id)[limit];
    if (lim.t < Date.now()) {
      lim.t = Date.now() + this.limits[limit].duration;
      lim.l = this.limits[limit].limit;
      lim.c = [];
    }
    lim.l--;
    if (cache) lim.c.push(cache);
    return this.check(id);
  }


  clear(id: any, limit: number) {
    if (limit === undefined) return this.cache.delete(id);
    this.set(id, limit, { t: Date.now() + this.limits[limit].duration, l: this.limits[limit].limit, c: [] });
  }
}