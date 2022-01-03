import { Collection } from '@ruinguard/core';

export default class RatelimitManager {
  constructor(limits) {
    if (!Array.isArray(limits)) limits = [limits];
    this.limits = limits;
    this.cache = new Collection();
  }

  get(id) {
    return this.cache.ensure(id, () => this.limits.map(limit => ({ t: Date.now() + limit.duration, l: limit.limit, c: [] })));
  }

  set(id, limit, data) {
    this.get(id)[limit] = data;
  }

  check(id) {
    return this.get(id).find(l => l.l <= 0 && l.t >= Date.now());
  }

  call(id, { limit = 0, cache } = {}) {
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


  clear(id, limit) {
    if (limit === undefined) return this.cache.delete(id);
    this.set(id, limit, { t: Date.now() + this.limits[limit].duration, l: this.limits[limit].limit, c: [] });
  }
}