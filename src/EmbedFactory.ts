import {
  Interaction,
  MessageEmbed,
  MessageAttachment,
  Sticker,
  InteractionReplyOptions,
  EmbedFooterData,
  EmbedAuthorData,
  EmbedFieldData,
  MessageEmbedImage,
  MessageEmbedThumbnail,
} from 'discord.js';

declare module 'discord.js' {
  interface Interaction {
    embed(...args: any[]): MessageEmbed,
    send(data: InteractionReplyOptions): typeof Interaction
    edit(data: InteractionReplyOptions): typeof Interaction
  }
  interface InteractionReplyOptions {
    toMsg?(): object,
  }

  interface MessageEmbed {
    toMsg?(): object,
  }

  interface MessageAttachment {
    toMsg?(): object,
  }

  interface Sticker {
    toMsg?(): object,
  }
}

declare global {
  interface String {
    toMsg?(): object,
  }
}


export interface RichEmbed {
  author?: EmbedAuthorData,
  title?: string,
  url?: string,
  thumbnail?: MessageEmbedThumbnail,
  description?: string,
  image?: MessageEmbedImage,
  fields?: EmbedFieldData[],
  color?: number,
  footer?: EmbedFooterData,
  timestamp?: number,
  toMsg?(): object,
}

export interface RichEmbedOptions {
  author?: EmbedAuthorData,
  title?: string,
  url?: string,
  thumbnail?: string,
  description?: string,
  image?: string,
  fields?: EmbedFieldData[],
  color?: number,
  footer?: EmbedFooterData,
  timestamp?: number,
}

export interface CreateEmbedOptions {
  splash?: boolean,
}


Interaction.prototype.embed = function (...args) {
  return this.client.embeds.create(...args);
};

Interaction.prototype.send = function (data) {
  if (data.toMsg) data = data.toMsg();
  return this.replied
    ? this.followUp(data)
    : this.reply(data);
};
Interaction.prototype.edit = function (data) {
  if (data.toMsg) data = data.toMsg();
  return this.replied
    ? this.editReply(data)
    : this.update(data);
};

MessageEmbed.prototype.toMsg = function () {
  return { embeds: [this] };
};
MessageAttachment.prototype.toMsg = function () {
  return { files: [this] };
};
Sticker.prototype.toMsg = function () {
  return { stickers: [this.id] };
};
String.prototype.toMsg = function () {
  return { content: this };
};

export interface EmbedFactoryOptions {
  splashes?: EmbedFooterData[];
  color?: number;
}

export default class EmbedFactory {
  splashes: EmbedFooterData[];
  color: number;

  constructor(options: EmbedFactoryOptions = {}) {
    this.splashes = options.splashes;
    this.color = options.color || 0x2f3136;
  }

  randomSplash(): EmbedFooterData {
    return this.splashes && this.splashes[Math.floor(Math.random() * this.splashes.length)];
  }

  create(data: RichEmbedOptions, options: CreateEmbedOptions = {}): RichEmbed {
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
        footer: data.footer
          ? data.footer
          : options.splash!==false && this.randomSplash(),
        timestamp: data.timestamp,
        toMsg() {
          return { embeds: [this] };
        },
      };
  }
}
