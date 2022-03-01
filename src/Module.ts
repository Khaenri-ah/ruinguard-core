import { Intents } from 'discord.js';
import { getDir, File } from 'file-ez';
import fetch from 'node-fetch';
import * as Path from 'path';

import Command from './Command';
import Event from './Event';

export type CommandsResolvable = string | Command | CommandsResolvable[];
export type EventsResolvable = string | Event | EventsResolvable[];

export interface ModuleOptions {
  name?: string,
  commands?: Command[],
  events?: Event[],
  intents?: any,
  options?: object,
}

export interface RegisterCommandOptions {
  app: string,
  token: string,
}

export interface RegisterGuildCommandOptions extends RegisterCommandOptions {
  guild: string,
}

export default class Module {
  name: string;
  commands: Command[];
  events: Event[];
  intents: any;
  options: object;

  constructor(data: ModuleOptions = {}) {
    this.name = data.name || '';
    this.commands = data.commands || [];
    this.events = data.events || [];
    this.intents = new Intents(data.intents||[]);
    this.options = data.options || {};
  }

  static async loadCommands(commands: CommandsResolvable): Promise<Command[]> {
    if (commands instanceof Command) return [commands];
    if (Array.isArray(commands)) return (await Promise.all(commands.map(c => Module.loadCommands(c)))).flat();

    if (typeof commands !== 'string') throw new TypeError('commands must be an array, a Command, or a string');
    if (!Path.isAbsolute(commands)) throw new Error('if commands is a string, it must be an absolute path');

    const files: File[] = await getDir(commands).recursive();
    return Module.loadCommands(await Promise.all(files.map(async (file: File) => file.import())));
  }

  static async loadEvents(events: EventsResolvable): Promise<Event[]> {
    if (events instanceof Event) return [events];
    if (Array.isArray(events)) return (await Promise.all(events.map(e => Module.loadEvents(e)))).flat();

    if (typeof events !== 'string') throw new TypeError('events must be an array, a Event, or a string');
    if (!Path.isAbsolute(events)) throw new Error('if events is a string, it must be an absolute path');

    const files: File[] = await getDir(events).recursive();
    return Module.loadEvents(await Promise.all(files.map(async file => file.import())));
  }



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
