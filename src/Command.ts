import {
  Permissions,
  ApplicationCommandData,
  PermissionString,
  BitField,
  BaseCommandInteraction,
} from 'discord.js';
import Bot from './Bot';

import CommandFlags from './CommandFlags';

export interface CommandOptionPermissions {
  /** Permissions a user needs to invoke this command */
  user?: Permissions,
  /** Permissions this bot needs to be able to execute this command properly */
  self?: Permissions,
}

export interface CommandPermissions {
  /** Permissions a user needs to invoke this command */
  user: Readonly<BitField<PermissionString, bigint>>,
  /** Permissions this bot needs to be able to execute this command properly */
  self: Readonly<BitField<PermissionString, bigint>>,
}

export interface CommandOptions {
  /** The data sent to discord when registering the command */
  data: ApplicationCommandData,
  /** The function to be called when this command is invoked */
  run(interaction: BaseCommandInteraction): any,
  /** Flags to set on the command */
  flags: CommandFlags,
  /** The permissions required to invoke or execute the command */
  permissions: CommandOptionPermissions,
}

export default class Command {
  /** The data sent to discord when registering this command */
  data: ApplicationCommandData;
  /** The name of this command */
  name: string;
  /** {@link CommandOptions.run} */
  function: (interaction: BaseCommandInteraction<'cached'>) => any;
  /** This command's flags */
  flags: CommandFlags;
  /** The permissions required to invoke or execute this command */
  permissions: CommandPermissions;

  /**
   * Creates a new command
   * @param options Options for this command
   * @returns A new command
   * #### Example
   * ```js
   * const command = new Command({
   *   data: {
   *     name: 'ping',
   *     description: 'hello?',
   *   },
   *
   *   run(interaction) {
   *     return interaction.send('pong!');
   *   }
   * });
   */
  constructor(options: CommandOptions) {
    this.data = options.data;
    this.name = options.data.name;
    this.function = options.run;

    this.flags = new CommandFlags(options.flags).freeze();
    this.permissions = {
      user: new Permissions(options.permissions?.user).freeze(),
      self: new Permissions(options.permissions?.self).freeze(),
    };
  }

  /**
   * Runs this command
   * @param interaction The interaction that triggered this command
   * @returns The return value of [Command.function](#function)
   */
  async run(interaction: BaseCommandInteraction<'cached'>) {
    if (this.flags.has(1<<0) && interaction.client instanceof Bot && !interaction.client.owners.includes(interaction.user.id)) return;

    if (this.flags.has(1<<1) && !interaction.guild) {
      return interaction.reply({
        content: 'This command can only be used in a server.',
        ephemeral: true,
      });
    }

    if (!interaction.member.permissionsIn(interaction.channel).has(this.permissions.user)) {
      return interaction.reply({
        content: 'You\'re missing permissions.',
        ephemeral: true,
      });
    }

    if (!interaction.guild.me.permissionsIn(interaction.channel).has(this.permissions.self)) {
      return interaction.reply({
        content: 'I\'m missing permissions.',
        ephemeral: true,
      });
    }

    return this.function(interaction);
  }
}
