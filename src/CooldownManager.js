import Keyv from 'keyv';

export default class CooldownManager {
  constructor(cooldown = 0) {
    this.cooldown = cooldown;
    this._cooldowns = new Keyv();
  }

  async add(key, cooldown = this.cooldown) {
    await this._cooldowns.set(key, Date.now() + cooldown, cooldown);
  }

  async check(key) {
    const timestamp = await this._cooldowns.get(key);
    if (!timestamp) return false;
    const timeLeft = timestamp - Date.now();
    return timeLeft;
  }
}
