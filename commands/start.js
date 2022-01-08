const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x:რომ დაიწყოთ გათამაშება გჭირდებათ manage messages-ის უფლებები.');
    }


    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: თქვენ უნდა მიუთითოთ სწორი არხი!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: თქვენ უნდა მიუთითოთ მოქმედი ხანგრძლივობა!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: თქვენ უნდა მიუთითოთ გამარჯვებულების სწორი რაოდენობა!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: თქვენ უნდა მიუთითოთ მოქმედი პრიზი!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: parseInt(giveawayNumberWinners),
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 გათამაშება 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 გათამაშება დასრულდა 🎉🎉",
            timeRemaining: "დარჩენილი დრო: **{duration}**!",
            inviteToParticipate: "დაარეაქთე 🎉-ით რომ მიიღო მონაწილეობა!",
            winMessage: "გილოცავ(თ), {winners}! შენ/თქვენ მოიგეთ **{prize}**!",
            embedFooter: "გათამაშებები",
            noWinner: "გათამაშება გაუქმდა, არავის მონაწილეობა არ მიუღია😥.",
            hostedBy: "გათამაშების ავტორია: {user}",
            winners: "გამარჯვებული",
            endedAt: "დამთავრდა",
            units: {
                seconds: "წამი",
                minutes: "წუთი",
                hours: "საათი",
                days: "დღე",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`გათამაშება დაიწყო ${giveawayChannel}!`);

};
  