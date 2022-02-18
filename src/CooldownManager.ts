import * as Keyv from 'keyv';

export default class CooldownManager {
  cooldown: number;
  cooldowns: Keyv<number>;

  constructor(cooldown: number = 0) {
    this.cooldown = cooldown;
    this.cooldowns = new Keyv<number>();
  }

  async add(key: string, cooldown = this.cooldown): Promise<void> {
    await this.cooldowns.set(key, Date.now() + cooldown, cooldown);
  }

  async check(key: string): Promise<number|false> {
    const timestamp = await this.cooldowns.get(key);
    return timestamp
      ? timestamp - Date.now()
      : false;
  }
}
