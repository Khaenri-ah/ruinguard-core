import Discord from 'discord.js';
import CommandManager from './CommandManager.js';
import EmbedFactory from './EmbedFactory.js';
import Keyv from 'keyv';
// import EventManager from './EventManager.js';

export default class Bot extends Discord.Client {
  constructor(options={}) {
    options.intents = new Discord.Intents(options.modules.map(m => m.intents));
    super(options);

    this.owners = options.owners ?? [options.owner];
    this.embeds = new EmbedFactory(options.embeds);
    this.db = new Keyv(options.keyv);

    this.modules = options.modules??[];
    this.commands = new CommandManager(this, this.modules.flatMap(m => m.commands));
    for (const event of this.modules.flatMap(m => m.events)) {
      event.init(this);
    }
  }

  async login(token) {
    if (!this.listenerCount('interactionCreate')) this.on('interactionCreate', this._onInteractionCreate);
    await super.login(token);
    return this;
  }

  async _onInteractionCreate(interaction) {
    const command = this.commands.resolve(interaction.commandName);
    if (!command) return;

    try {
      const res = await command.run(interaction);
      if (res?.toMsg) return interaction.send(res);
    } catch (err) {
      console.log(err);
      const res = interaction.embed('Oops! An error has occured');
      return interaction.send(res);
    }
  }
}
