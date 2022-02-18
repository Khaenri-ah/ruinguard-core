
const Discord = require('discord.js');

module.exports = {
  ...Discord,
  Bot: require('./dist/cjs/Bot.js'),
  Command: require('./dist/cjs/Command.js'),
  CommandFlags: require('./dist/cjs/CommandFlags.js'),
  CommandManager: require('./dist/cjs/CommandManager.js'),
  CooldownManager: require('./dist/cjs/CooldownManager.js'),
  EmbedFactory: require('./dist/cjs/EmbedFactory.js'),
  Event: require('./dist/cjs/Event.js'),
  Module: require('./dist/cjs/Module.js'),
  Oauth: require('./dist/cjs/Oauth.js'),
  RatelimitManager: require('./dist/cjs/RatelimitManager.js'),
}
