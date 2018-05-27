const Discord = require("discord.js");
const action = require("../functions/action.js");
const unban = action.unban;

module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!message.member.permissions.has('BAN_MEMBERS')) return client.noperm(message, 'BAN_MEMBERS');
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) return client.clientperm(message, 'BAN_MEMBERS');
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${conf.prefix}help unban\` for help.`);
    const id = args[0];
    if (isNaN(parseInt(id))) return message.reply(`|\\❌| IDs can only be a string of numbers.`);
    if (id.length !== 18) return message.reply(`|\\❌| IDs can only be 18 characters in length.`);
    let reason = args.slice(1).join(' ');
    if (reason.length < 1) reason = 'No reason provided.';
    await client.fetchUser(id).then(async user => {
        try {
            await message.guild.unban(id);
        } catch (e) {
            return message.reply(`|\\❌| An error occurred: ${e.stack}`);
        };
        await message.channel.send(`Unbanning the user \`${user.username}\`...`).then(m => {
            setTimeout(() => {
                m.edit(`${message.author}, Successfully unbanned the user \`${user.tag}\`!`);
            }, (1000));
        });
        unban(client, message, conf.modlog, message.author.tag, message.author.displayAvatarURL, user.tag, user.id, user.displayAvatarURL, reason, '44ff88');
    })
    .catch(err => {
        return message.reply('|\\❌| It seems the provided ID does not belong to a Discord user.');
    });
};

module.exports.help = {
    name: 'unban',
    description: 'Unbans a banned user.',
    usage: '[prefix]unban <user ID> <reason>'
};