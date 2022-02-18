import { Client, Collection } from 'discord.js';
import Command from './Command';

export default class CommandManager {
  client: Client;
  cache: Collection<string, Command>;

  constructor(client: Client, commands: Command[]) {
    this.client = client;
    this.cache = new Collection(commands.map(c => [c.name, c]));
  }

  resolve(command: Command|string) {
    return this.cache.get(typeof command === 'string' ? command : command.name);
  }
}
