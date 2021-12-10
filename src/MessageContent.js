import Discord from 'discord.js';

Discord.Interaction.prototype.send = function (data) {
  if (data instanceof MessageContent) data = data.toMsg();
  return this.replied
    ? this.followUp(data)
    : this.reply(data);
};
Discord.Interaction.prototype.edit = function (data) {
  if (data instanceof MessageContent) data = data.toMsg();
  return this.replied
    ? this.editReply(data)
    : this.update(data);
};

export default class MessageContent {
  constructor(data) {
    this.data = data;
  }

  toMsg() {
    return this.data;
  }


  static embed(embed, data) {
    return new MessageContent({ ...data, embeds: [embed] });
  }
  static embeds(embeds, data) {
    return new MessageContent({ ...data, embeds });
  }
  static content(content, data) {
    return new MessageContent({ ...data, content });
  }
}
