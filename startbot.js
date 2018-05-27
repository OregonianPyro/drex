const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const fs = require("fs"); 
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
client.login(settings.token); //log our client in

//function to return if a user lacks permission to run a command.
client.noperm = function (msg, perm) {
    msg.reply(`|\\❌| This command requires that you have the permission \`${perm}\` which you do not have!`);
};

//function to return if the bot lacks a permission for a command.
client.clientperm = function (msg, perm) {
    msg.delete(), msg.reply(`|\\❌| The bot lacks the permission \`${perm}\`. In order for the bot to execute this command, please give it the permission it lacks!`);
};

//loading events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});
//attatch a logging system to our client
client.log = (color, msg) => {
    console.log(color`${msg}`);
};require('./functions/action.js');
client.settings = new Enmap({ provider: new EnmapLevel({ name: "settings" }) });
client.default = {
    "prefix":"🔨",
    "modlog":"drex-modlog",
    "muterole":"Muted"
};
process.on("unhandledRejection", e => console.log(e.stack));
