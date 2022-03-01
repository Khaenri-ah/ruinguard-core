import { BitField } from 'discord.js';

export default class CommandFlags extends BitField<string, number> {
  /**
   * Numeric command flags. All available properties:
   * - `OWNER_ONLY`
   * - `GUILD_ONLY`
   */
  static FLAGS = {
    OWNER_ONLY: 1<<0,
    GUILD_ONLY: 1<<1,
  }
}
