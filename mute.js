const Discord = require("discord.js");
const ms = require("ms");
const action = require("../functions/action.js");
const mute = action.mute;
const unmute = action.unmute;

module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('MANAGE_ROLES')) return client.noperm(message, 'MANAGE_ROLES');
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) return client.clientperm(message, 'MANAGE_ROLES');
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${client.settings.prefix}help mute\` for help.`);
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply(`|\\❌| Could not find that member.`);
    if (member.user.id === message.author.id) return message.reply(`|\\❌| You cannot mute yourself.`);
    //if (member.roles.highestRole.calculatedPosition >= message.member.roles.me.highestRole.calculatedPosition) return message.reply(`|\\❌| That user has a higher or equal role than you and cannot be moderated.`);
    const time = args[1];
    if (!time) return message.reply('|\\❌| Please provide the argument \'time\'.');
    if (isNaN(parseInt(time))) return message.reply('|\\❌| The time can only be a number.');
    const reason = args.slice(2).join(' ');
    if (reason.length < 1) return message.reply(`|\\❌| Please provide the argument 'reason'.`);
    let muteRole = message.guild.roles.find("name", conf.muterole);
    // return console.log(muteRole);
    if (!muteRole) return message.reply(`|\\❌| This server does not have a role named \`${conf.muterole}\``);
    if (member.roles.has(muteRole.id)) return message.reply(`|\\❌| That user appears to be muted already.`)
    try {
        await member.send(`You were muted in ${message.guild.name} for ${ms(ms(time), {long: true})} by ${message.author.tag}. [Reason: ${reason}]`);
    } catch (e) {
        console.log(e);
    };
    try {
        await member.addRole(muteRole);
    }catch(e){
        return message.reply(`|\\❌| An error occurred: ${e}`);
    };
    await message.channel.send(`Muting the user \`${member.user.username}\`...`).then(m => {
        setTimeout(() => {
            m.edit(`${message.author}, Successfully muted \`${member.user.tag}\` for **${ms(ms(time), {long: true})}**`);
        }, (1000));
    });
    setTimeout(() => {
        member.removeRole(muteRole);
    }, ms(time));
    const modlog = message.guild.channels.filter(c => c.name === conf.modlog);
    if (!modlog) return console.log(`Could not find a modlogs channel by the name of ${conf.modlog}`);
    if (modlog) {
        await mute(client, message, ms(ms(time), { long: true }), conf.modlog, message.author.tag, message.author.displayAvatarURL, member.user.tag, member.user.id, member.user.displayAvatarURL, reason, '4495ff');
        setTimeout(() => {
            unmute(client, message, conf.modlog, client.user.tag, client.user.displayAvatarURL, member.user.tag, member.user.id, member.user.displayAvatarURL, "Mute expired.", '4495ff');

        }, ms(time));
    };
};

module.exports.help = {
    name: 'mute',
    description: 'Mutes a user.',
    usage: '[prefix]mute <@user|user ID> <time> <reason>'
};