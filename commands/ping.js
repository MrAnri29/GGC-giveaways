const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if(message.author.bot) return;
  
  let prefix = config.prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
  const m = await message.channel.send("Hold on .....")
  
  let pong = new Discord.MessageEmbed()
  .setTitle("๐ Pong!")
  .setColor('RANDOM')
  .setTimestamp()
  .addField("แจแแงแแแแแแ", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API แจแแงแแแแแแ", `${Math.round(client.ws.ping)}ms`, true)
  .setFooter(`${message.author.tag}-แแก แฒแแแ  แแแแฎแแแแแแ`, message.author.displayAvatarURL());

  m.edit(pong)
}

module.exports.help = {
  name: "ping"
}