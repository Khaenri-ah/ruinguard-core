import {
  Permissions,
  ApplicationCommandData,
  PermissionString,
  BitField,
  BaseCommandInteraction,
} from 'discord.js';

import CommandFlags from './CommandFlags';
import EmbedFactory from './EmbedFactory';
import Module from './Module';
import CommandManager from './CommandManager';
import * as Keyv from 'keyv';

declare module 'discord.js' {
  interface Client {
    owners: string[];
    embeds: EmbedFactory;
    db: Keyv;
    modules: Module[];
    commands: CommandManager;
  }
}

interface CommandOptionPermissions {
  user?: Permissions,
  self?: Permissions,
}

interface CommandPermissions {
  user: Readonly<BitField<PermissionString, bigint>>,
  self: Readonly<BitField<PermissionString, bigint>>,
}

interface CommandOptions {
  data: ApplicationCommandData,
  run(interaction: BaseCommandInteraction): any,
  flags: CommandFlags,
  permissions: CommandOptionPermissions,
}

export default class Command {
  data: ApplicationCommandData;
  name: string;
  function: Function;
  flags: CommandFlags;
  permissions: CommandPermissions;

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

  async run(interaction: BaseCommandInteraction<'cached'>) {
    if (this.flags.has(1<<0) && !interaction.client.owners.includes(interaction.user.id)) return;

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
