import Keyv from 'keyv';

export default class CooldownManager {
  constructor(cooldown = 0) {
    this.cooldown = cooldown;
    this.cooldowns = new Keyv();
  }

  async add(key, cooldown = this.cooldown) {
    await this.cooldowns.set(key, Date.now() + cooldown, cooldown);
  }

  async check(key) {
    const timestamp = await this.cooldowns.get(key);
    return timestamp
      ? timestamp - Date.now()
      : false;
  }
}
