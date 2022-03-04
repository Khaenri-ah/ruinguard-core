import {
  Client,
  ClientOptions,
  Intents,
  Interaction,
} from 'discord.js';
import Keyv from 'keyv';

import { CommandManager } from './CommandManager';
import { Module } from './Module';

export interface BotOptions extends ClientOptions {
  /** The modules this bot should load */
  modules?: Module[],
  /** The owner of this bot, if there's one */
  owner?: string,
  /** The owners of this bot, if there's multiple */
  owners?: string[],
  /** Options for {@link Client.db} */
  keyv?: Keyv.Options<any>,
}

export class Bot extends Client {
  /** The owner(s) of this bot */
  owners: string[];
  /** A keyv instance for quick key-value storage */
  db: Keyv;
  /** The currently loaded modules */
  modules: Module[];
  /** Manages this bot's commands */
  commands: CommandManager;

  /**
   * Creates a new bot
   * @param options Options for your bot
   * @returns A new bot
   * #### Example
   * ```js
   * const bot = new Bot({ intents: 513 });
   * ```
   */
  constructor(options: BotOptions = { intents: 0 }) {
    options.intents = new Intents(options.modules?.map(m => m.intents) || []);
    super(options);

    this.owners = options.owners ?? [options.owner];
    this.db = new Keyv(options.keyv);

    this.modules = options.modules ?? [];
    this.commands = new CommandManager(this, this.modules.flatMap(m => m.commands));
    for (const event of this.modules.flatMap(m => m.events)) {
      event.init(this);
    }
  }

  /**
   * Logs in to discord
   * @param token Your bot token
   * @returns The bot token you logged in with
   * #### Example
   * ```js
   * const bot = new Bot({ intents: 513 });
   * await bot.login('TOTALLYMYTOKEN')
   * ```
   */
  async login(token: string): Promise<string> {
    if (!this.listenerCount('interactionCreate')) this.on('interactionCreate', this._onInteractionCreate);
    return super.login(token);
  }


  /**
   * [Client.login](#login): chainable edition
   * @param token Your bot token
   * @returns The bot this was called on
   * #### Example
   * ```js
   * const bot = await new Bot({ intents: 513 }).connect('ABSOLUTELYMYTOKEN');
   * ```
   */
  async connect(token: string): Promise<Bot> {
    await this.login(token);
    return this;
  }

  /**
   * The default command handler. You'll need to call this if you want your own code to run for interactions, but you also want the default handling.
   * @param interaction The interaction to be handled
   * @returns The return value of the command's {@link Command.function | .function}
   * #### Example
   * ```js
   * bot.on('interactionCreate', interaction => {
   *   console.log(interaction);
   *   bot._onInteractionCreate(interaction);
   * });
   * ```
   */
  async _onInteractionCreate(interaction: Interaction<'cached'>): Promise<any> {
    if (!interaction.isApplicationCommand()) return;
    const command = this.commands.resolve(interaction.commandName);
    if (!command) return;

    try {
      const res = await command.run(interaction);
      if (res?.toMsg) return interaction.send(res);
    } catch (err) {
      console.log(err);
      return interaction.send({ embeds: [{ description: 'Oops! An error has occurred' }] });
    }
  }
}
