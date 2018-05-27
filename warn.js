const Discord = require("discord.js");
const fs = require("fs");
const warns = require("../warns.json");
const chalk = require("chalk");
const action = require('../functions/action.js');
const warn = action.warn;
module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('KICK_MEMBERS')) return client.noperm(message, 'KICK_MEMBERS');
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${conf.prefix}help warn\` for help.`);
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply('|\\❌| Could not find that user.');
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) return message.reply(`|\\❌| Please provide the argument 'reason'.`);
    if (!warns[member.user.id]) warns[member.user.id] = {
        warns: 0
    };
    warns[member.user.id].warns++;
    try {
        await fs.writeFile('./warns.json', JSON.stringify(warns));
    } catch (e) {
        message.reply('|\\❌| An error occurred: Database error. More information is available in the console.');
        return client.log(chalk.bgBlack.redBright, `[!] Error with the command 'warn': Error writing to the DB: ${e.stack}`);
    };
    await message.channel.send(`Warning the user \`${member.user.username}\`...`).then(m => {
        setTimeout(() => {
            m.edit(`Successfully warned \`${member.user.tag}\`!`);
        }, (1000));
    });
    try {
        await member.send(`You were warned in ${message.guild.name} by ${message.author.tag}. [Reason: ${reason}]`);
    } catch (e) {
        console.log(e);
    };
    //client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color, warns
    const modlog = message.guild.channels.find("name", conf.modlog);
    if (!modlog) return console.log(`Couldn't find a modlog channel by the name of '${conf.modlog}'`);
    if (modlog) {
        warn(client, message, conf.modlog, message.author.tag, message.author.displayAvatarURL, member.user.tag, member.user.id, member.user.displayAvatarURL, reason, "fff244", warns[member.user.id].warns);
    };
    return;
};

module.exports.help = {
    name: 'warn',
    description: 'Adds a warning to a user.', 
    usage: '[prefix]warn <@user|user ID> <reason>'
};