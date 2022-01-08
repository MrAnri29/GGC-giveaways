const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor( "GGC giveaway",`https://cdn.discordapp.com/avatars/929419146058420255/9c34193e62ce0585a587f322610eb26c.webp?size=512`) 
      .setTitle("ბრძანებების სია & FAQ")
      .setDescription("ქვემოთ მოცემულია ბრძანებები, რომელთა შესრულებაც შეგიძლიათ Bot-ით, ახლა მხოლოდ 5 ბრძანებაა ხელმისაწვდომი, მალე დაემატება მეტი ბრძანება.")
      .addField("🎁 გათამაშება 🎁","start [არხის-სახელი] [დრო] [გამარჯვებულები] [პრიზი]\nreroll [პრიზის სახელი]\nend [პრიზის სახელი]")
      .addField("მაგალითები", ",,start #giveaway 5m 1 რაღაც პრიზი\,,end რაღაც პრიზი\n,,reroll რაღაც პრიზი")
      .addField("Utility", "ping, invite", true)
      .addField("ℹ ინფორმაცია ℹ", "stats", true)
      .setTimestamp()
      .setFooter(`Command Requested By ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("**გამოგიგზავნეთ ბრძანებები პირდაპირ შეტყობინებებში! 💌, შეამოწმეთ პირადი შეტყობინებები(DM)**");

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}
