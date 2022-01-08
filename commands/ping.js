const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if(message.author.bot) return;
  
  let prefix = config.prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
  const m = await message.channel.send("Hold on .....")
  
  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor('RANDOM')
  .setTimestamp()
  .addField("შეყოვნება", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API შეყოვნება", `${Math.round(client.ws.ping)}ms`, true)
  .setFooter(`${message.author.tag}-ის Მიერ მოთხოვნილი`, message.author.displayAvatarURL());

  m.edit(pong)
}

module.exports.help = {
  name: "ping"
}