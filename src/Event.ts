import { Client } from "discord.js";

interface EventOptions {
  event: string,
  name?: string,
  once?: boolean,
  run(...args: any[]): any,
}

export default class Event {
  event: string;
  name: string;
  repeat: boolean;
  function(...args: any[]): any {};

  constructor(data: EventOptions) {
    this.event = data.event;
    this.name = data.name;
    this.repeat = !data.once;
    this.function = data.run;
  }

  init(client: Client): Event {
    this.repeat
      ? client.on(this.event, this.run.bind(this))
      : client.once(this.event, this.run.bind(this));
    return this;
  }

  run(...args: any[]): any {
    this.function(...args);
  }
}
