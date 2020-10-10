const { MessageEmbed } = require("discord.js");
const leveling = require('discord-leveling');
const Levels = require('discord-xp');
const Discord = require('discord.js');
Levels.setURL = ('./database.sqlite')


module.exports = {

        name: "perfil",
        cooldown: 3,
        description: "mostra seu perfil",

    async execute(message, args) {
    var user = message.mentions.users.first() || message.author
 
var output = await leveling.Fetch(user.id)
    const EEmbed = new Discord.MessageEmbed()
        .setTitle(`Os dados de${user.tag} são...`)
        .setThumbnail("https://i.imgur.com/m5P8jaT.gif")
        .setImage("https://thumbs.gfycat.com/AggressiveRadiantAkitainu-size_restricted.gif")
        .setColor('#b82343')
        .setFooter(`por: ${message.author.username}`)
        .setTimestamp()
        .setDescription(`**(:crossed_swords:) | Level: ${output.level}. \n (:coin:) XP: ${output.xp}. \n (:arrow_up_small:) Rank: LeaderBoard. **`);
    message.channel.send(EEmbed);
    }
}