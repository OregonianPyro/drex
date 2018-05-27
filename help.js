module.exports.run = async (client, message, args) => {
    let conf = client.settings.get(message.guild.id);
    if (!args[0]) return message.reply(`|\\❌| Incorrect usage. Run \`${conf.prefix}help help\` for help.`); //too many 'help's
    let cmd = args[0];
    let cmdFile = require(`./${cmd}.js`);
    if (!cmdFile) return message.reply(`|\\❌| That command does not exist.`);
    if (!cmdFile.help) return message.reply(`|\\❌| That command does not have a \`module.exports.help\` line.`);
    let name = cmdFile.help.name;
    let desc = cmdFile.help.description;
    let usage = cmdFile.help.usage;
    usage = usage.replace('[prefix]', conf.prefix,);

    return message.channel.send(`= Help ${name} =\nDescription:: ${desc}\nUsage:: ${usage}`, { code: "asciidoc" });
};

module.exports.help = {
    name: 'help',
    description: 'Get help on a command.',
    usage: '[prefix]help <command>'
};