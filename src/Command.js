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
    if (this.flags.has(1<<1) && !interaction.guild) return interaction.embed('This command can only be used in a server.');

    if (!interaction.member.permissionsIn(interaction.channel).has(this.permissions.user)) return interaction.embed('You\'re missing permissions.');
    if (!interaction.guild.me.permissionsIn(interaction.channel).has(this.permissions.self)) return interaction.embed('I\'m missing permissions.');

    return this.function(interaction);
  }
}
