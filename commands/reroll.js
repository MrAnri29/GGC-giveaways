const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: შენ უნდა გქონდეს manage messages-ის უფლებები რომ თავიდან გაათამაშო გათამაშება.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: თქვენ უნდა მიუთითოთ სწორი შეტყობინების ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('საჩუქრის პოვნა ვერ ხერხდება `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('თავიდან გათამაშდა!');
    })
    .catch((e) => {
        if(e.startsWith(`გათამაშება შეტყობინების ID-ით ${giveaway.messageID} არ არის დასრულებული.`)){
            message.channel.send('ეს გათამაშება არ დასრულებულა!');
        } else {
            console.error(e);
            message.channel.send('Მოხდა შეცდომა...');
        }
    });

};