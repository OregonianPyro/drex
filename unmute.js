const Discord = require("discord.js");
const action = require("../functions/action.js");
const unmute = action.unmute;

module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('MANAGE_ROLES')) return client.noperm(message, 'MANAGE_ROLES');
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) return client.clientperm(message, 'MANAGE_ROLES');
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${client.settings.prefix}help unmute\` for help.`);
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply(`|\\❌| Could not find that member.`);
    if (member.user.id === message.author.id) return message.reply(`|\\❌| You cannot unmute yourself.`);
    //if (member.roles.highestRole.calculatedPosition >= message.member.roles.me.highestRole.calculatedPosition) return message.reply(`|\\❌| That user has a higher or equal role than you and cannot be moderated.`);
    let reason = args.slice(1).join(' ');
    if (reason.length < 1) reason = "No reason provided.";
    let muteRole = message.guild.roles.find("name", conf.muterole);
    // return console.log(muteRole);
    if (!muteRole) return message.reply(`|\\❌| This server does not have a role named \`${conf.muterole}\``);
    if (!member.roles.has(muteRole.id)) return message.reply(`|\\❌| That user does not appear to be muted.`)
    try {
        await member.send(`You were unmuted in ${message.guild.name} by ${message.author.tag}. [Reason: ${reason}]`);
    } catch (e) {
        console.log(e);
    };
    try {
        await member.removeRole(muteRole);
    } catch (e) {
        return message.reply(`|\\❌| An error occurred: ${e}`);
    };
    await message.channel.send(`Unmuting the user \`${member.user.username}\`...`).then(m => {
        setTimeout(() => {
            m.edit(`${message.author}, Successfully unmuted \`${member.user.tag}\`!`);
        }, (1000));
    });
    const modlog = message.guild.channels.filter(c => c.name === client.settings.modlog.toLowerCase());
    if (!modlog) return console.log(`Could not find a modlogs channel by the name of ${client.settings.modlog}`);
    if (modlog) {
        unmute(client, message, conf.modlog, message.author.tag, message.author.displayAvatarURL, member.user.tag, member.user.id, member.user.displayAvatarURL, reason, '4495ff');
    };
};

module.exports.help = {
    name: 'unmute',
    description: 'Unmutes a muted user.',
    usage: '[prefix]unmute <@user|user ID> <reason>'
};