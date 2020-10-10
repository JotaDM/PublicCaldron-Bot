/*
If you want to make discord-leveling guild based you have to use message.author.id + message.guild.id as ID for example:
leveling.AddLevel(message.author.id + message.guild.id, toAdd).then(l => console.log(l))
 
This will create an unique ID for each guild member
*/
 
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const leveling = require('discord-leveling');
const Levels = require('discord-xp');

//Create the bot client

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");

const client = new Client({ disableMentions: "everyone" });

client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`'Prefixo: ";" \n Em desenvolvimento \n Desenvolvido por: JotaDM#0001'`);
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}
//Set the prefix and token of the bot.
 
//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
client.on('message', async message => {

  var profile = await leveling.Fetch(message.author.id)
  leveling.AddXp(message.author.id, 10)
  //If user xp higher than 100 add level
  if (profile.xp + 10 > 1000) {
    await leveling.AddLevel(message.author.id, 1)
    await leveling.SetXp(message.author.id, 0)
    message.channel.send(`Parabéns ${message.author} você subiu para o nível: ${profile.level + 1} :tada:`)
  }

  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
    message.delete({timeout: 0});
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
  
  Levels.setURL = ('/database.sqlite')
 
  //This reads the first part of your message behind your prefix to see which command you want to use.
 
  //If the user that types a message is a bot account return.
  if (message.author.bot) return;
 
  //When someone sends a message add xp
 
  //If the message does not start with your prefix return.
 
//#endregion

  if (message.content.toLowerCase() === ";help") {
    const helpEmbed = new Discord.MessageEmbed()
        .setTitle("(:robot:) Comandos do bot: ")
        .setColor('#b82343')
        .setThumbnail('https://i.imgur.com/m5P8jaT.gif')
        .setImage('https://pa1.narvii.com/7098/1151354de8b4596e7ad86b14c7d44aaef45abb20r1-400-222_00.gif')
        .setFooter(`por ${message.author.username}`)
        .setTimestamp()
        .setDescription('(:musical_note:) - Comandos de música:```\n• ;play\n• ;stop\n• ;skip```\n(:star:) - Comandos de level:\n ```• ;perfil\n• ;leaderboard```');
    message.reply(helpEmbed);
}
 
  if (command == 'delete') { //You want to make this command admin only!
 
    var user = message.mentions.users.first()
    if (!user) return message.reply('Porfavor especifique o usuário que eu terei que apagar do meu DataBase')
 
    if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('Você precisa da permissão de administrador para executar este comando!')
 
    var output = await leveling.Delete(user.id)
    if (output.deleted == true) return message.reply('Usuário deletado do DataBase com sucesso!')
 
    message.reply('Error: Não consegui encontrar este usuário na minha DataBase')
 
  }
})


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '💬┋bate-papo'); // change this to the channel name you want to send the greeting to
  if (!channel) return;
  channel.send(`Bem vindo ${member}!`);
});

client.login(TOKEN);
 
//Your secret token to log the bot in. (never show this to anyone!)