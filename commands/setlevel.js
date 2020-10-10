const { MessageEmbed } = require("discord.js");
const leveling = require('discord-leveling');
const Levels = require('discord-xp');
const Discord = require('discord.js');
Levels.setURL = ('./database.sqlite')


module.exports = {
    name: "setlevel",
    cooldown: 3,
    description: "seta o level do usuario",
    
    async execute(message, args) {
var amount = args[0]
var user = message.mentions.users.first() || message.author

var output = await leveling.SetLevel(user.id, amount)
message.channel.send(`Ei ${message.mentions.users.first()}! Agora voce está level ${amount}!`);
}
}
