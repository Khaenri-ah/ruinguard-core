import { BitField } from 'discord.js';

export default class CommandFlags extends BitField<string, number> {
  static FLAGS = {
    OWNER_ONLY: 1<<0,
    GUILD_ONLY: 1<<1,
  }
}
