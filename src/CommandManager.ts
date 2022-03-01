import { Client, Collection } from 'discord.js';
import Command from './Command';

export default class CommandManager {
  /** The client that this manager belongs to */
  client: Client;
  /** The commands this manager is currently managing */
  cache: Collection<string, Command>;

  /**
   * Creates a new command manager
   * @param client The client that this manager belongs to
   * @param commands The commands this manager should manage
   * @returns A new command manager
   */
  constructor(client: Client, commands: Command[]) {
    this.client = client;
    this.cache = new Collection(commands.map(c => [c.name, c]));
  }

  /**
   * Resolves a command or the name of a command to a command
   * @param command A command or its name
   * @returns The command matching the name
   */
  resolve(command: Command|string) {
    return this.cache.get(typeof command === 'string' ? command : command.name);
  }
}
