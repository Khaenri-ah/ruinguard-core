import Discord from 'discord.js';
import { getDir } from 'file-ez';
import fetch from 'node-fetch';
import Path from 'path';
import Command from './Command.js';
import Event from './Event.js';

export default class Module {
  constructor(options={}) {
    return new Promise(async res => {
      this.commands = await Module.loadCommands(options.commands||[]);
      this.events = await Module.loadEvents(options.events||[]);
      this.intents = new Discord.Intents(options.intents??0);
      this.options = options.options??{};
      res(this);
    });
  }

  static async loadCommands(commands) {
    if (commands instanceof Command) return [commands];
    if (Array.isArray(commands)) return commands;

    if (typeof commands !== 'string') throw new TypeError('commands must be an array, a Command, or a string');
    if (!Path.isAbsolute(commands)) throw new Error('if commands is a string, it must be an absolute path');

    const files = await getDir(commands).recursive();
    return Promise.all(files.map(async file => file.import()));
  }

  static async loadEvents(events) {
    if (events instanceof Event) return Module.loadEvents([events]);
    if (Array.isArray(events)) return events;

    if (typeof events !== 'string') throw new TypeError('events must be an array, a Event, or a string');
    if (!Path.isAbsolute(events)) throw new Error('if events is a string, it must be an absolute path');

    const files = await getDir(events).recursive();
    return Promise.all(files.map(async file => file.import()));
  }



  static async registerGuildCommands(modules, options) {
    console.log(modules.flatMap(m => m.commands.map(c => c.data)));
    const res = await fetch(`https://discord.com/api/v9/applications/${options.app}/guilds/${options.guild}/commands`, {
      method: 'put',
      body: JSON.stringify(modules.flatMap(m => m.commands.map(c => c.data))),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${options.token}`,
      },
    });
    return res.json();
  }

  static async registerGlobalCommands(modules, options) {
    const res = await fetch(`https://discord.com/api/v9/applications/${options.app}/commands`, {
      method: 'put',
      body: JSON.stringify(modules.flatMap(m => m.commands.map(c => c.data))),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${options.token}`,
      },
    });
    return res.json();
  }
}
