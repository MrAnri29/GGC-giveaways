const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: შენ უნდა გქონდეს manage messages-ის უფლებები რომ დაასრულო გათამაშება.');
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
        return message.channel.send('ამ გათამაშების პოვნა ვერ ხერხდება `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('გათამაშება დასრულდება ნაკლებ დროში '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' წამი...');
    })
    .catch((e) => {
        if(e.startsWith(`გათამაშება შეტყობინების ID-ით ${giveaway.messageID} უკვე დასრულებულია.`)){
            message.channel.send('ეს გათამაშება უკვე დასრულებულია!');
        } else {
            console.error(e);
            message.channel.send('Მოხდა შეცდომა...');
        }
    });

};