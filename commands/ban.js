const Discord = require("discord.js");
const chalk = require("chalk");
const action = require('../functions/action.js');
const ban = action.ban;
module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('BAN_MEMBERS')) return client.noperm(message, 'BAN_MEMBERS');
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) return client.clientperm(message, 'BAN_MEMBERS');
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${conf.prefix}help ban\` for help.`);
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply(`|\\❌| Could not find that member.`);
    if (member.user.id === message.author.id) return message.reply(`|\\❌| You cannot kick yourself.`);
    //if (member.roles.highestRole.calculatedPosition >= message.member.roles.me.highestRole.calculatedPosition) return message.reply(`|\\❌| That user has a higher or equal role than you and cannot be moderated.`);
    if (!member.bannable) return message.reply(`|\\❌| That user cannot be banned.`);
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) return message.reply(`|\\❌| Please provide the argument 'reason'.`);
    try {
        await member.send(`You were banned from ${message.guild.name} by ${message.author.tag}. [Reason: ${reason}]`);
    } catch (e) {
        console.log(e);
    };
    try {
        await member.ban(`Banned by ${message.author.tag}. [Reason: ${reason}]`);
    } catch (e) {
        return message.reply(`|\\❌| Error banning.`), client.log(chalk.bgBlack.redBright, `[!] [COMMANDS] ERROR! There was an error running the command ban - - ${e.stack}`);
    };
    await message.channel.send(`Banning the user \`${member.user.username}\`...`).then(m => setTimeout(function () {
        m.edit(`${message.author}, Successfully banned \`${member.user.tag}\`!`);
    }, (1000)));
    let modlog = message.guild.channels.find('name', conf.modlog);
    if (!modlog) return console.log('No modlog channel could be found.');
    if (modlog) {
        // ban(client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color)
        ban(client, message, conf.modlog, message.author.tag, message.author.displayAvatarURL, member.user.tag, member.user.id, member.user.displayAvatarURL, reason, 'ff5444');
    };
    return;
};

module.exports.help = {
    name: 'ban',
    description: 'Bans a user.',
    usage: '[prefix]ban <@user|user ID> <reason>'
};