import { Client } from "discord.js";

export interface EventOptions {
  /** The discord.js event the new event should trigger on */
  event: string,
  /** The name of the new event */
  name?: string,
  /** If the event should only run once or multiple times */
  once?: boolean,
  /** The function to be called when the event is received */
  run(...args: any[]): any,
}

export default class Event {
  /** The discord.js event this event triggers on */
  event: string;
  /** The name of this event */
  name: string;
  /** If this command should be called every time the event is received, or only the first time */
  repeat: boolean;
  /** {@link EventOptions.run} */
  function(...args: any[]): any {};

  /**
   * Creates a new event
   * @param data The data for this event
   */
  constructor(data: EventOptions) {
    this.event = data.event;
    this.name = data.name;
    this.repeat = !data.once;
    this.function = data.run;
  }

  /**
   * Initializes the event
   * @param client The client this event should listen on
   * @returns The event
   */
  init(client: Client): Event {
    this.repeat
      ? client.on(this.event, this.run.bind(this))
      : client.once(this.event, this.run.bind(this));
    return this;
  }

  /**
   * Runs this event
   * @param args arguments from the discord.js event
   */
  run(...args: any[]): any {
    this.function(...args);
  }
}
