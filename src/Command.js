import CommandFlags from './CommandFlags.js';
import Discord from 'discord.js';

export default class Command {
  constructor(data) {
    this.data = data.data;
    this.name = data.data.name;
    this.function = data.run;

    this.flags = new CommandFlags(data.flags).freeze();
    this.permissions = {
      self: new Discord.Permissions(data.permissions?.self).freeze(),
      user: new Discord.Permissions(data.permissions?.user).freeze(),
    };
  }

  async run(interaction) {
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
