const Discord = require("discord.js");
const chalk = require("chalk");
const action = require('../functions/action.js');
const kick = action.kick;

module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('KICK_MEMBERS')) return client.noperm(message, 'KICK_MEMBERS');
    if (!message.guild.me.permissions.has('KICK_MEMBERS')) return client.clientperm(message, 'KICK_MEMBERS');
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${conf.prefix}help kick\` for help.`);
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply(`|\\❌| Could not find that member.`);
    if (member.user.id === message.author.id) return message.reply(`|\\❌| You cannot kick yourself.`);
    //if (member.roles.highestRole.calculatedPosition >= message.member.roles.me.highestRole.calculatedPosition) return message.reply(`|\\❌| That user has a higher or equal role than you and cannot be moderated.`);
    if (!member.kickable) return message.reply(`|\\❌| That user cannot be kicked.`);
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) return message.reply(`|\\❌| Please provide the argument 'reason'.`);
    try {
        await member.send(`You were kicked from ${message.guild.name} by ${message.author.tag}. [Reason: ${reason}]`);
    }catch(e){
        console.log(e);
    };
    try {
        await member.kick(`Kicked by ${message.author.tag}. [Reason: ${reason}]`);
    }catch(e){
        return message.reply(`|\\❌| Error kicking.`), client.log(chalk.bgBlack.redBright, `[!] [COMMANDS] ERROR! There was an error running the command kick - - ${e.stack}`);
    };
    await message.channel.send(`Kicking the user \`${member.user.username}\`...`).then(m => setTimeout(function () {
        m.edit(`${message.author}, Successfully kicked \`${member.user.tag}\`!`);
    }, (1000)));
    let modlog = message.guild.channels.find('name', conf.modlog);
    if (!modlog) return console.log('No modlog channel could be found.');
    if (modlog) {
        // ban(client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color)
        kick(client, message,  conf.modlog, message.author.tag, message.author.displayAvatarURL, member.user.tag, member.user.id, member.user.displayAvatarURL, reason, 'ffb144');
    };
    return;
};

module.exports.help = {
    name: 'kick',
    description: 'Kicks a user.',
    usage: '[prefix]kick <@user|user ID> <reason>'
};