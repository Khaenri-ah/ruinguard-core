
import Discord from 'discord.js';

import _Bot from './src/Bot.js';
import _Command from './src/Command.js';
import _CommandFlags from './src/CommandFlags.js';
import _CommandManager from './src/CommandManager.js';
import _CooldownManager from './src/CooldownManager.js';
import _EmbedFactory from './src/EmbedFactory.js';
import _Event from './src/Event.js';
import _MessageContent from './src/MessageContent.js';
import _Module from './src/Module.js';
import _Oauth from './src/Oauth.js';

export default {
  ...Discord,
  Bot: _Bot,
  Command: _Command,
  CommandFlags: _CommandFlags,
  CommandManager: _CommandManager,
  CooldownManager: _CooldownManager,
  EmbedFactory: _EmbedFactory,
  Event: _Event,
  MessageContent: _MessageContent,
  Module: _Module,
  Oauth: _Oauth,
};

export const Bot = _Bot;
export const Command = _Command;
export const CommandFlags = _CommandFlags;
export const CommandManager = _CommandManager;
export const CooldownManager = _CooldownManager;
export const EmbedFactory = _EmbedFactory;
export const Event = _Event;
export const MessageContent = _MessageContent;
export const Module = _Module;
export const Oauth = _Oauth;

export const BaseClient = Discord.BaseClient;
export const Client = Discord.Client;
export const Shard = Discord.Shard;
export const ShardClientUtil = Discord.ShardClientUtil;
export const ShardingManager = Discord.ShardingManager;
export const WebhookClient = Discord.WebhookClient;
export const ActivityFlags = Discord.ActivityFlags;
export const ApplicationFlags = Discord.ApplicationFlags;
export const BaseManager = Discord.BaseManager;
export const BitField = Discord.BitField;
export const Collection = Discord.Collection;
export const Constants = Discord.Constants;
export const DataResolver = Discord.DataResolver;
export const DiscordAPIError = Discord.DiscordAPIError;
export const Formatters = Discord.Formatters;
export const HTTPError = Discord.HTTPError;
export const Intents = Discord.Intents;
export const LimitedCollection = Discord.LimitedCollection;
export const MessageFlags = Discord.MessageFlags;
export const Options = Discord.Options;
export const Permissions = Discord.Permissions;
export const RateLimitError = Discord.RateLimitError;
export const SnowflakeUtil = Discord.SnowflakeUtil;
export const SystemChannelFlags = Discord.SystemChannelFlags;
export const ThreadMemberFlags = Discord.ThreadMemberFlags;
export const UserFlags = Discord.UserFlags;
export const Util = Discord.Util;
export const version = Discord.version;
export const ApplicationCommandManager = Discord.ApplicationCommandManager;
export const ApplicationCommandPermissionsManager = Discord.ApplicationCommandPermissionsManager;
export const BaseGuildEmojiManager = Discord.BaseGuildEmojiManager;
export const CachedManager = Discord.CachedManager;
export const ChannelManager = Discord.ChannelManager;
export const ClientVoiceManager = Discord.ClientVoiceManager;
export const DataManager = Discord.DataManager;
export const GuildApplicationCommandManager = Discord.GuildApplicationCommandManager;
export const GuildBanManager = Discord.GuildBanManager;
export const GuildChannelManager = Discord.GuildChannelManager;
export const GuildEmojiManager = Discord.GuildEmojiManager;
export const GuildEmojiRoleManager = Discord.GuildEmojiRoleManager;
export const GuildInviteManager = Discord.GuildInviteManager;
export const GuildManager = Discord.GuildManager;
export const GuildMemberManager = Discord.GuildMemberManager;
export const GuildMemberRoleManager = Discord.GuildMemberRoleManager;
export const GuildStickerManager = Discord.GuildStickerManager;
export const MessageManager = Discord.MessageManager;
export const PermissionOverwriteManager = Discord.PermissionOverwriteManager;
export const PresenceManager = Discord.PresenceManager;
export const ReactionManager = Discord.ReactionManager;
export const ReactionUserManager = Discord.ReactionUserManager;
export const RoleManager = Discord.RoleManager;
export const StageInstanceManager = Discord.StageInstanceManager;
export const ThreadManager = Discord.ThreadManager;
export const ThreadMemberManager = Discord.ThreadMemberManager;
export const UserManager = Discord.UserManager;
export const VoiceStateManager = Discord.VoiceStateManager;
export const WebSocketManager = Discord.WebSocketManager;
export const WebSocketShard = Discord.WebSocketShard;
export const Activity = Discord.Activity;
export const AnonymousGuild = Discord.AnonymousGuild;
export const Application = Discord.Application;
export const ApplicationCommand = Discord.ApplicationCommand;
export const AutocompleteInteraction = Discord.AutocompleteInteraction;
export const Base = Discord.Base;
export const BaseCommandInteraction = Discord.BaseCommandInteraction;
export const BaseGuild = Discord.BaseGuild;
export const BaseGuildEmoji = Discord.BaseGuildEmoji;
export const BaseGuildTextChannel = Discord.BaseGuildTextChannel;
export const BaseGuildVoiceChannel = Discord.BaseGuildVoiceChannel;
export const BaseMessageComponent = Discord.BaseMessageComponent;
export const ButtonInteraction = Discord.ButtonInteraction;
export const CategoryChannel = Discord.CategoryChannel;
export const Channel = Discord.Channel;
export const ClientApplication = Discord.ClientApplication;
export const ClientPresence = Discord.ClientPresence;
export const ClientUser = Discord.ClientUser;
export const Collector = Discord.Collector;
export const CommandInteraction = Discord.CommandInteraction;
export const CommandInteractionOptionResolver = Discord.CommandInteractionOptionResolver;
export const ContextMenuInteraction = Discord.ContextMenuInteraction;
export const DMChannel = Discord.DMChannel;
export const Emoji = Discord.Emoji;
export const Guild = Discord.Guild;
export const GuildAuditLogs = Discord.GuildAuditLogs;
export const GuildAuditLogsEntry = Discord.GuildAuditLogsEntry;
export const GuildBan = Discord.GuildBan;
export const GuildChannel = Discord.GuildChannel;
export const GuildEmoji = Discord.GuildEmoji;
export const GuildMember = Discord.GuildMember;
export const GuildPreview = Discord.GuildPreview;
export const GuildPreviewEmoji = Discord.GuildPreviewEmoji;
export const GuildTemplate = Discord.GuildTemplate;
export const Integration = Discord.Integration;
export const IntegrationApplication = Discord.IntegrationApplication;
export const Interaction = Discord.Interaction;
export const InteractionCollector = Discord.InteractionCollector;
export const InteractionWebhook = Discord.InteractionWebhook;
export const Invite = Discord.Invite;
export const InviteStageInstance = Discord.InviteStageInstance;
export const InviteGuild = Discord.InviteGuild;
export const Message = Discord.Message;
export const MessageActionRow = Discord.MessageActionRow;
export const MessageAttachment = Discord.MessageAttachment;
export const MessageButton = Discord.MessageButton;
export const MessageCollector = Discord.MessageCollector;
export const MessageComponentInteraction = Discord.MessageComponentInteraction;
export const MessageEmbed = Discord.MessageEmbed;
export const MessageMentions = Discord.MessageMentions;
export const MessagePayload = Discord.MessagePayload;
export const MessageReaction = Discord.MessageReaction;
export const MessageSelectMenu = Discord.MessageSelectMenu;
export const NewsChannel = Discord.NewsChannel;
export const OAuth2Guild = Discord.OAuth2Guild;
export const PartialGroupDMChannel = Discord.PartialGroupDMChannel;
export const PermissionOverwrites = Discord.PermissionOverwrites;
export const Presence = Discord.Presence;
export const ReactionCollector = Discord.ReactionCollector;
export const ReactionEmoji = Discord.ReactionEmoji;
export const RichPresenceAssets = Discord.RichPresenceAssets;
export const Role = Discord.Role;
export const SelectMenuInteraction = Discord.SelectMenuInteraction;
export const StageChannel = Discord.StageChannel;
export const StageInstance = Discord.StageInstance;
export const Sticker = Discord.Sticker;
export const StickerPack = Discord.StickerPack;
export const StoreChannel = Discord.StoreChannel;
export const Team = Discord.Team;
export const TeamMember = Discord.TeamMember;
export const TextChannel = Discord.TextChannel;
export const ThreadChannel = Discord.ThreadChannel;
export const ThreadMember = Discord.ThreadMember;
export const Typing = Discord.Typing;
export const User = Discord.User;
export const VoiceChannel = Discord.VoiceChannel;
export const VoiceRegion = Discord.VoiceRegion;
export const VoiceState = Discord.VoiceState;
export const Webhook = Discord.Webhook;
export const Widget = Discord.Widget;
export const WidgetMember = Discord.WidgetMember;
export const WelcomeChannel = Discord.WelcomeChannel;
export const WelcomeScreen = Discord.WelcomeScreen;
export const WebSocket = Discord.WebSocket;
