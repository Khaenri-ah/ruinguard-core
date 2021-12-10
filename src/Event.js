export default class Event {
  constructor(data) {
    this.event = data.event;
    this.name = data.name;
    this.repeat = !data.once;
    this.function = data.run;
  }

  init(client) {
    this.repeat
      ? client.on(this.event, this.run.bind(this))
      : client.once(this.event, this.run.bind(this));
  }

  run(...args) {
    this.function(...args);
  }
}
