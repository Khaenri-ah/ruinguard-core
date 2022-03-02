import { Interaction, MessageEmbed, MessageAttachment, Sticker, MessageOptions } from 'discord.js';
export * from 'discord.js';

export * from './Command';
export * from './Bot';
export * from './CommandFlags';
export * from './CommandManager';
export * from './CooldownManager';
export * from './Event';
export * from './Module';
export * from './RatelimitManager';

export * as Oauth from './Oauth';
declare module 'discord.js' {
  interface Interaction {
    /**
     * sends a message, choosing between `reply()` and `followUp()` automatically
     * @param data message data, or anything with a `toMsg()` method
     */
    send(data: InteractionReplyOptions | MessageOptions): Promise<Message>
    /**
     * sends a message, choosing between `update()` and `editReply()` automatically
     * !!! warning
     *     Calling `edit()` without sending anything first will throw an error if the interaction is not from a component!
     * @param data message data, or anything with a `toMsg()` method
     */
    edit(data: InteractionReplyOptions | MessageOptions): Promise<Message>
  }
  interface InteractionReplyOptions {
    toMsg?(): MessageOptions,
  }

  interface MessageEmbed {
    /**
     * Creates a message object with this embed
     * @returns A message object
     */
    toMsg?(): MessageOptions,
  }

  interface MessageAttachment {
    /**
     * Creates a message object with this attachment
     * @returns A message object
     */
    toMsg?(): MessageOptions,
  }

  interface Sticker {
    /**
     * Creates a message object with this sticker
     * @returns A message object
     */
    toMsg?(): MessageOptions,
  }
}

declare global {
  interface String {
    /**
     * Creates a message object with this string as message content
     * @returns A message object
     */
    toMsg?(): MessageOptions,
  }
}

Interaction.prototype.send = function (data) {
  if ('toMsg' in data) data = data.toMsg();
  return this.replied
    ? this.followUp(data)
    : this.reply(data);
};
Interaction.prototype.edit = function (data) {
  if ('toMsg' in data) data = data.toMsg();
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