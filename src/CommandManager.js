import Discord from 'discord.js';

export default class CommandManager {
  constructor(client, commands) {
    this.client = client;
    this.cache = new Discord.Collection(commands.map(c => [c.name, c]));
  }

  resolve(command) {
    return this.cache.get(command.name||command);
  }
}
