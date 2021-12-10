import Discord from 'discord.js';

export default class EventManager {
  constructor(client, events) {
    this.client = client;
    this.cache = new Discord.Collection(events.map(e => [e.name, e]));
  }

  resolve(name) {
    return this.cache.find(c => c.name==name||c.aliases?.includes(name));
  }
}
