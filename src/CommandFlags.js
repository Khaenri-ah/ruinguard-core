import Discord from 'discord.js';

export default class CommandFlags extends Discord.BitField {
  constructor(bits) {
    super(bits);
  }

  static FLAGS = {
    OWNER_ONLY: 1<<0,
    GUILD_ONLY: 1<<1,
  }
}
