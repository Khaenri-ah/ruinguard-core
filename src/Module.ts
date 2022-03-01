import { Intents } from 'discord.js';
import fetch from 'node-fetch';

import Command from './Command';
import Event from './Event';

export type CommandsResolvable = string | Command | CommandsResolvable[];
export type EventsResolvable = string | Event | EventsResolvable[];

export interface ModuleOptions {
  /** The name of the new module */
  name?: string,
  /** The commands of the new module */
  commands?: Command[],
  /** The event handlers of the new module */
  events?: Event[],
  /** The intents the new module requires */
  intents?: any,
  /** Additional options */
  options?: object,
}

export interface RegisterCommandOptions {
  /** The client ID of you application */
  app: string,
  /** The bot token of you application */
  token: string,
}

export interface RegisterGuildCommandOptions extends RegisterCommandOptions {
  /** The ID of the guild you want to register commands on */
  guild: string,
}

export default class Module {
  /** The name of this module */
  name: string;
  /** The commands belonging to this module */
  commands: Command[];
  /** The event handlers belonging to this module */
  events: Event[];
  /** The intents this module requires */
  intents: any;
  /** {@link ModuleOptions.options} */
  options: object;

  /**
   * Creates a new module
   * @param data Options for a module
   * @returns A new module
   * #### Examples
   * ```js
   * const module = new Module({
   *   commands: [myPingCommand, myUserInfoCommand],
   *   intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
   * });
   * ```
   */
  constructor(data: ModuleOptions = {}) {
    this.name = data.name || '';
    this.commands = data.commands || [];
    this.events = data.events || [];
    this.intents = new Intents(data.intents||[]);
    this.options = data.options || {};
  }

  /**
   * Registers command for a guild
   * @param modules The modules you want to register commands from
   * @param options Options for registering commands
   * @returns The raw response from discord
   * #### Examples
   * ```js
   * await Module.registerGuildCommands([myModule], {
   *   app: '826883237992988733',
   *   token: 'DEFINITELYMYTOKEN',
   *   guild: '838473416310652998',
   * });
   * ```
   */
  static async registerGuildCommands(modules: Module[], options: RegisterGuildCommandOptions): Promise<object> {
    console.log(modules.flatMap(m => m.commands.map(c => c.data)));
    const res = await fetch(`https://discord.com/api/v9/applications/${options.app}/guilds/${options.guild}/commands`, {
      method: 'put',
      body: JSON.stringify(modules.flatMap(m => m.commands.map(c => c.data))),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${options.token}`,
      },
    });
    return res.json() as object;
  }

  /**
   * Registers command globally
   * @param modules The modules you want to register commands from
   * @param options Options for registering commands
   * @returns The raw response from discord
   * #### Examples
   * ```js
   * await Module.registerGuildCommands([myModule], {
   *   app: '886305122232172554',
   *   token: 'MUSTBEMYTOKEN',
   * });
   * ```
   */
  static async registerGlobalCommands(modules: Module[], options: RegisterCommandOptions): Promise<object> {
    const res = await fetch(`https://discord.com/api/v9/applications/${options.app}/commands`, {
      method: 'put',
      body: JSON.stringify(modules.flatMap(m => m.commands.map(c => c.data))),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${options.token}`,
      },
    });
    return res.json() as object;
  }
}
