import {
  Client,
  ClientOptions,
  Intents,
  Interaction,
} from 'discord.js';
import * as Keyv from 'keyv';

import CommandManager from './CommandManager';
import EmbedFactory, { EmbedFactoryOptions } from './EmbedFactory';
import Module from './Module';

interface BotOptions extends ClientOptions {
  modules?: Module[],
  embeds?: EmbedFactoryOptions,
  owner?: string,
  owners?: string[],
  keyv?: Keyv.Options<any>,
}

export default class Bot extends Client {
  owners: string[];
  embeds: EmbedFactory;
  db: Keyv;
  modules: Module[];
  commands: CommandManager;

  constructor(options: BotOptions = { intents: 0 }) {
    options.intents = new Intents(options.modules.map(m => m.intents));
    super(options);

    this.owners = options.owners ?? [options.owner];
    this.embeds = new EmbedFactory(options.embeds);
    this.db = new Keyv(options.keyv);

    this.modules = options.modules ?? [];
    this.commands = new CommandManager(this, this.modules.flatMap(m => m.commands));
    for (const event of this.modules.flatMap(m => m.events)) {
      event.init(this);
    }
  }

  async login(token: string): Promise<string> {
    if (!this.listenerCount('interactionCreate')) this.on('interactionCreate', this._onInteractionCreate);
    return super.login(token);
  }

  async connect(token: string): Promise<Bot> {
    await this.login(token);
    return this;
  }

  async _onInteractionCreate(interaction: Interaction<'cached'>): Promise<any> {
    if (!interaction.isApplicationCommand()) return;
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
