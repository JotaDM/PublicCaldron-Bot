const { MessageEmbed } = require("discord.js");
const leveling = require('discord-leveling');
const Levels = require('discord-xp');
const discord = require('discord.js');
const { Client, Collection } = require("discord.js");
Levels.setURL = ('./database.sqlite')
const client = new Client();


module.exports = {
    name: "leaderboard",
    cooldown: 3,
    description: "mostra o placar de lideres de level",
    
    async execute(message, args) {
        if (message.mentions.users.first()) {
 
            var output = await leveling.Leaderboard({
              search: message.mentions.users.first().id
            })
            message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output.placement} on my leaderboard!`);
       
            //Searches for the top 3 and outputs it to the user.
          } else {
       
            leveling.Leaderboard({
              limit: 3 //Only takes top 3 ( Totally Optional )
            }).then(async users => { //make sure it is async
       
              if (users[0]) var firstplace = await client.user.fetch(users[0].userid) //Searches for the user object in discord for first place
              if (users[1]) var secondplace = await client.user.fetch(users[1].userid) //Searches for the user object in discord for second place
              if (users[2]) var thirdplace = await client.user.fetch(users[2].userid) //Searches for the user object in discord for third place
       
              message.channel.send(`My leaderboard:
       
                1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].level || 'None'} : ${users[0] && users[0].xp || 'None'}
                2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].level || 'None'} : ${users[0] && users[0].xp || 'None'}
                3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].level || 'None'} : ${users[0] && users[0].xp || 'None'}`)
       
            })
       
          }
        }
}