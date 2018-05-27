module.exports.run = async (client, message,args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return client.noperm(message, 'MANAGE_SERVER');
    let conf = client.settings.get(message.guild.id);
    switch (args[0]) {
        case 'prefix':{
            if (!args[1]) return message.reply(`The current prefix for ${message.guild.name} is \`${conf.prefix}\``);
            let newPrefix = args[1];
            if (args[1].length >= 10) return message.reply('woah there, that seems a little long! Try a shorter prefix.');
            conf.prefix = newPrefix;
            client.settings.set(message.guild.id, conf);
            return message.reply(`Successfully set your prefix to \`${newPrefix}\``);
        };
        break;
        case 'modlog':
        {
            if (!args[1]) return message.reply(`The current modlog channel for ${message.guild.name} is \`#${conf.modlog}\``);
            let newModlog = message.mentions.channels.first().name || message.guild.channels.find('name', args.slice(1).join(' ')) || message.guild.channels.get(args[1]).name;
            if (!newModlog) return message.reply('That channel does not seem to exist.');
            conf.modlog = newModlog;
            client.settings.set(message.guild.id, conf);
            return message.reply(`Successfully set your modlog channel to \`#${newModlog}!\``);
        };
        break;
        case 'muterole':
        {
            if (!args[1]) return message.reply(`The current mute role for ${message.guild.name} is \`${conf.muterole}\``);
            let newRole = message.guild.roles.find('name', args.slice(1).join(' '));
            if (!newRole) return message.reply('That role does not seem to exist.');
            conf.muterole = newRole.name;
            client.settings.set(message.guild.id, conf);
            return message.reply(`Successfully set your mute role to \`${newRole.name}!\``);
        };
        break;
        default:
        {
            return message.reply('Invalid setting.')
        };
    };
};

    module.exports.help = {
        name: 'settings',
        description: 'View or change the settings for the guild.',
        usage: `Viewing a current setting:\n[prefix]settings <prefix|modlog|muterole>\n\nEditing a setting:\n[prefix]settings <prefix|modlog|muterole> <new prefix|new modlog|new muterole>`
    };