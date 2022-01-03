import Discord from 'discord.js';

export default class CommandFlags extends Discord.BitField {
  static FLAGS = {
    OWNER_ONLY: 1<<0,
    GUILD_ONLY: 1<<1,
  }
}
