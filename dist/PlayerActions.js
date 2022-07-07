"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
const Assets_1 = __importDefault(require("./Assets"));
const { MessageEmbed } = require('discord.js');
class PlayerActions {
    logger;
    assets;
    constructor() {
        this.logger = new Logger_1.default();
        this.assets = new Assets_1.default();
    }
    //Listening to event emitters
    //For custom player object
    startPlayerEventListener(client) {
        this.logger.debug("Starting player event listener...");
        this.addSong(client);
        this.playSong(client);
        this.empty(client);
        this.finish(client);
        //Add playlist
        client.player.on("addList", (queue, playlist) => queue.textChannel.send(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`));
        //Error
        client.player.on("error", (channel, error) => channel.send("An error encountered: " + error));
        //Initializing queue
        client.player.on("initQueue", (queue) => {
            queue.autoplay = true;
            queue.volume = 100;
        });
        //No related songs found for query
        //Only emits when autoplay is on
        client.player.on("noRelated", (queue) => queue.textChannel.send("Can't find related video to play."));
        //Search is canceled due to timeout
        client.player.on("searchCancel", (message) => message.channel.send(`Searching canceled due to timeout!`));
        //Invalid search answer
        client.player.on("searchInvalidAnswer", (message) => message.channel.send(`You answered an invalid number!`));
        //No results from query
        client.player.on("searchNoResult", (message, query) => message.channel.send(`No result found for ${query}!`));
        //More than 1 result from query
        //Has to be enabled
        client.player.on("searchResult", (message, results) => {
            message.channel.send(`**Choose an option from below**\n${results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        });
        this.logger.debug("Player events loaded succesfully!");
    }
    //Add Song Event
    addSong(client) {
        client.player.on("addSong", (queue, song) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(this.assets.embedColor)
                    .setTitle('Added Song')
                    .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    .addFields({ name: `${song.name}`, value: `*Requested by:* ${song.user}` }, { name: 'Position in Queue', value: `\`${queue.songs.length}\``, inline: true }, { name: `Length`, value: `\`${song.formattedDuration}\``, inline: true }, { name: `URL`, value: `${song.url}`, inline: true })
                    .setTimestamp()
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: this.assets.footerText })
            ]
        }).then((repliedMessage) => {
            setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal);
        }));
    }
    //Playing Next Song Event
    playSong(client) {
        client.player.on("playSong", (queue, song) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(this.assets.embedColor)
                    .setTitle('Now Playing')
                    .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    .addFields({ name: `${song.name}`, value: `*Requested by:* ${song.user}` }, { name: "Source", value: `\`${song.source}\``, inline: true }, { name: `Length`, value: `\`${song.formattedDuration}\``, inline: true }, { name: `URL`, value: `${song.url}`, inline: true })
                    .setTimestamp()
                    .setImage(song.thumbnail)
                    .setFooter({ text: this.assets.footerText })
            ]
        }).then((repliedMessage) => {
            setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNP);
        }));
    }
    //Empty channel event
    empty(client) {
        client.player.on("empty", (queue) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(this.assets.embedColor)
                    .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    .addFields({ name: `Channel is empty, leaving all channels!`, value: `There has to be a user connected to a channel for Alive Music Bot to play music.` })
                    .setTimestamp()
                    .setFooter({ text: this.assets.footerText })
            ]
        }).then((repliedMessage) => {
            setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNP);
        }));
    }
    //Finished queue event
    finish(client) {
        client.player.on("finish", (queue) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(this.assets.embedColor)
                    .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    .addFields({ name: `Queue has finished!`, value: `In order to keep listening to music, add some songs to the queue using: \`/play\`` })
                    .setTimestamp()
                    .setFooter({ text: this.assets.footerText })
            ]
        }).then((repliedMessage) => {
            setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNP);
        }));
    }
}
exports.default = PlayerActions;
