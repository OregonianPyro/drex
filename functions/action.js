const Discord = require("discord.js");
//warning
module.exports.warn = async (client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color, warns) => {
    let log = message.guild.channels.find("name", modlog);
    if (!log) return console.log('No modlog channel found.');
    if (log) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${userTag} (${userID}) | Warning`, userAvatar)
            .setDescription(`**ACTION:** Warning\n**MODERATOR:** ${moderatorTag}\n**REASON**: ${reason}\n\nThis is warning #${warns} for ${userTag}`)
            .setFooter(`Executed by ${moderatorTag} in #${message.channel.name}`, moderatorAvatar)
            .setTimestamp()
        try {
            await log.send(embed);
            return;
        }catch(e){
            console.log(`[!] Error logging the warning - - ${e.stack}`);
        };
    };  
};
//muted
module.exports.mute = async (client, message, time, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color) => {
    let log = message.guild.channels.find("name", modlog);
    if (!log) return console.log('No modlog channel found.');
    if (log) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${userTag} (${userID}) | Mute`, userAvatar)
            .setDescription(`**ACTION:** Mute\n**MODERATOR:** ${moderatorTag}\n**REASON**: ${reason}\n**DURATION:** ${time}`)
            .setFooter(`Executed by ${moderatorTag} in #${message.channel.name}`, moderatorAvatar)
            .setTimestamp()
        try {
            await log.send(embed);
            return;
        } catch (e) {
            console.log(`[!] Error logging the mute - - ${e.stack}`);
        };
    };
};
//unmuted
module.exports.unmute = async (client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color) => {
    let log = message.guild.channels.find("name", modlog);
    if (!log) return console.log('No modlog channel found.');
    if (log) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${userTag} (${userID}) | Unmute`, userAvatar)
            .setDescription(`**ACTION:** Unmute\n**MODERATOR:** ${moderatorTag}\n**REASON**: ${reason}`)
            .setFooter(`Executed by ${moderatorTag} in #${client.settings.modlog}`, moderatorAvatar)
            .setTimestamp()
        try {
            await log.send(embed);
            return;
        } catch (e) {
            return console.log(`[!] Error logging the unmute - - ${e.stack}`);
        };
    };
};
//kicked
module.exports.kick = async (client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color) => {
    let log = message.guild.channels.find("name", modlog);
    if (!log) console.log('No modlog channel found.');
    if (log) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${userTag} (${userID}) | Kick`, userAvatar)
            .setDescription(`**ACTION:** Kick\n**MODERATOR:** ${moderatorTag}\n**REASON**: ${reason}`)
            .setFooter(`Executed by ${moderatorTag} in #${message.channel.name}`, moderatorAvatar)
            .setTimestamp()
        try {
            await log.send(embed);
            return;
        } catch (e) {
            console.log(`[!] Error logging the kick - - ${e.stack}`);
        };
    };
};
//banned
module.exports.ban = async (client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color) => {
    let log = message.guild.channels.find("name", modlog);
    if (!log) console.log('No modlog channel found.');
    if (log) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${userTag} (${userID}) | Ban`, userAvatar)
            .setDescription(`**ACTION:** Ban\n**MODERATOR:** ${moderatorTag}\n**REASON**: ${reason}`)
            .setFooter(`Executed by ${moderatorTag} in #${message.channel.name}`, moderatorAvatar)
            .setTimestamp()
        try {
            await log.send(embed);
            return;
        } catch (e) {
            console.log(`[!] Error logging the ban - - ${e.stack}`);
        };
    };
};
//unbanned
module.exports.unban = async (client, message, modlog, moderatorTag, moderatorAvatar, userTag, userID, userAvatar, reason, color) => {
    let log = message.guild.channels.find("name", modlog);
    if (!log) return console.log('No modlog channel found.');
    if (log) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${userTag} (${userID}) | Ban`, userAvatar)
            .setDescription(`**ACTION:** Unban\n**MODERATOR:** ${moderatorTag}\n**REASON**: ${reason}`)
            .setFooter(`Executed by ${moderatorTag} in #${message.channel.name}`, moderatorAvatar)
            .setTimestamp()
        try {
            await log.send(embed);
            return;
        } catch (e) {
            console.log(`[!] Error logging the unban - - ${e.stack}`);
        };
    };
};