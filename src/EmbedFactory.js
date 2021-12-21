import Discord from 'discord.js';


Discord.Interaction.prototype.embed = function (...args) {
  return this.client.embeds.create(...args);
};

Discord.Interaction.prototype.send = function (data) {
  if (data.toMsg) data = data.toMsg();
  return this.replied
    ? this.followUp(data)
    : this.reply(data);
};
Discord.Interaction.prototype.edit = function (data) {
  if (data.toMsg) data = data.toMsg();
  return this.replied
    ? this.editReply(data)
    : this.update(data);
};

Discord.MessageEmbed.prototype.toMsg = function () {
  return { embeds: [this] };
};
Discord.MessageAttachment.prototype.toMsg = function () {
  return { files: [this] };
};
Discord.Sticker.prototype.toMsg = function () {
  return { stickers: [this.id] };
};
String.prototype.toMsg = function () {
  return { content: this };
};


export default class EmbedFactory {
  constructor(options = {}) {
    this.splashes = options.splashes;
    this.color = options.color||0x2f3136;
  }

  randomSplash() {
    return this.splashes && this.splashes[Math.floor(Math.random() * this.splashes.length)];
  }

  create(data, options = {}) {
    return typeof data === 'string'
      ? this.create({ description: data })
      : {
        author: data.author,
        title: data.title,
        url: data.url,
        thumbnail: { url: data.thumbnail },
        description: data.description,
        image: { url: data.image },
        fields: data.fields,
        color: data.color || this.color,
        footer: (data.footer?.text||data.footer?.icon_url)
          ? data.footer
          : options.splash!==false && this.randomSplash(),
        timestamp: data.timestamp,
        toMsg() {
          return { embeds: [this] };
        },
      };
  }
}
