const { MessageEmbed } = require("discord.js");
const leveling = require('discord-leveling');
const Levels = require('discord-xp');
const Discord = require('discord.js');
Levels.setURL = ('./database.sqlite')


module.exports = {
    name: "setxp",
    cooldown: 3,
    description: "seta o xp do usuario",
    
    async execute(message, args) {
var amount = args[0]
var user = message.mentions.users.first() || message.author

var output = await leveling.SetXp(user.id, amount)
message.channel.send(`ei ${message.mentions.users.first()}! Agora você tem ${amount} de xp!`);
}
}