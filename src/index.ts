import { Interaction, MessageEmbed, MessageAttachment, Sticker, MessageOptions } from 'discord.js';
export * from 'discord.js';

import Bot from './Bot';
import Command from './Command';
import CommandFlags from './CommandFlags';
import CommandManager from './CommandManager';
import CooldownManager from './CooldownManager';
import Event from './Event';
import Module from './Module';
import * as Oauth from './Oauth';
import RatelimitManager from './RatelimitManager';

export * from './Command';
export * from './Bot';
export * from './CommandFlags';
export * from './CommandManager';
export * from './CooldownManager';
export * from './Event';
export * from './Module';
export * from './Oauth';
export * from './RatelimitManager';

export {Bot}
export {Command}
export {CommandFlags}
export {CommandManager}
export {CooldownManager}
export {Event}
export {Module}
export {Oauth}
export {RatelimitManager}

declare module 'discord.js' {
  interface Interaction {
    client: Bot,
    send(data: InteractionReplyOptions): Promise<Message>
    edit(data: InteractionReplyOptions): Promise<Message>
  }
  interface InteractionReplyOptions {
    toMsg?(): MessageOptions,
  }

  interface MessageEmbed {
    toMsg?(): MessageOptions,
  }

  interface MessageAttachment {
    toMsg?(): MessageOptions,
  }

  interface Sticker {
    toMsg?(): MessageOptions,
  }
}

declare global {
  interface String {
    toMsg?(): MessageOptions,
  }
}

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