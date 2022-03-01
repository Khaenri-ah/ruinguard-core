import * as Keyv from 'keyv';

export default class CooldownManager {
  /** The default cooldown in miliseconds */
  cooldown: number;
  /** All current cooldowns */
  cooldowns: Keyv<number>;

  /**
   * Creates a new cooldown manager
   * @param cooldown The default cooldown in miliseconds
   */
  constructor(cooldown: number = 0) {
    this.cooldown = cooldown;
    this.cooldowns = new Keyv<number>();
  }

  /**
   * Adds a new cooldown
   * @param key The identifier for this cooldown
   * @param cooldown How long this cooldown should last for, in miliseconds
   */
  async add(key: string, cooldown = this.cooldown): Promise<void> {
    await this.cooldowns.set(key, Date.now() + cooldown, cooldown);
  }

  /**
   * Checks if a cooldown exists
   * @param key The identifier for this cooldown
   * @returns How long this cooldown still lasts, if found
   */
  async check(key: string): Promise<number|false> {
    const timestamp = await this.cooldowns.get(key);
    return timestamp
      ? timestamp - Date.now()
      : false;
  }
}
