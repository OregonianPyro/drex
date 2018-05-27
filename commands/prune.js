const chalk = require("chalk");

module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return client.noperm(message, 'MANAGE_MESSAGES');
    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return client.clientperm(message, 'MANAGE_MESSAGES');
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${conf.prefix}help prune\` for help.`);
    if (isNaN(parseInt(args[0]))) return message.reply(`|\\❌| The number of messages to delete must be a number.`);
    if (args[0] > 1 && args[0] < 101) {
        await message.delete();
        try {
            await message.channel.bulkDelete(args[0]);
        } catch (e) {
            return message.reply(`|\\❌| Error pruning.`), client.log(chalk.bgBlack.redBright, `[PRUNING] Error pruning ${args[0]} messages in #${message.channel.name} - - ${e.stack}`);
        };
        return message.reply(`Successfully pruned \`${args[0]}\` messages!`).then(m => m.delete(5000));
    }else if(args[0] < 1 || args[0] > 100) {
        return message.reply('|\\❌| The number of messages to delete must be greater than `1` and less than `100`.');
    };
};

module.exports.help = {
    name: 'prune',
    description: 'Prunes the last x amount of message sent in the current channel.',
    usage: '[prefix]prune <1-100>'
};