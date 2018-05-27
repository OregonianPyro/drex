module.exports.run = async (client, message, args) => {
    return message.channel.send('Pinging...').then(m => m.edit(`${message.author} Pong! **${client.ping.toFixed()}ms**`));
};

module.exports.help = {
    name: 'ping',
    usage: '[prefix]ping',
    description: 'Checks the bot\'s connection the Discord API.'
};

module.exports.help = {
    name: 'ping',
    description: 'Checks the bot\'s response time to the API.',
    usage: '[prefix]ping'
};