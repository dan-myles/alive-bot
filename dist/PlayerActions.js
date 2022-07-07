"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
const { MessageEmbed } = require('discord.js');
class PlayerActions {
    logger;
    constructor() {
        this.logger = new Logger_1.default();
    }
    //Listening to event emitters
    //For custom player object
    startPlayerEventListener(client) {
        this.logger.debug("Starting player event listener...");
        this.addSong(client);
        //Add playlist
        client.player.on("addList", (queue, playlist) => queue.textChannel.send(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`));
        //Queue is empty
        client.player.on("empty", (queue) => queue.textChannel.send("Channel is empty. Leaving the channel"));
        //Error
        client.player.on("error", (channel, error) => channel.send("An error encountered: " + error));
        //Finished playing and nothing is in queue
        client.player.on("finish", (queue) => queue.textChannel.send("No more song in queue"));
        //Initializing queue
        client.player.on("initQueue", (queue) => {
            queue.autoplay = true;
            queue.volume = 100;
        });
        //No related songs found for query
        //Only emits when autoplay is on
        client.player.on("noRelated", (queue) => queue.textChannel.send("Can't find related video to play."));
        //Player switches songs
        client.player.on("playSong", (queue, song) => queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`));
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
    addSong(client) {
        //Add song
        // client.player.on("addSong", (queue: any, song: any) => queue.textChannel.send(
        //     `Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}.`
        // ));
        client.player.on("addSong", (queue, song) => queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Some title')
                    .setURL('https://discord.js.org/')
                    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                    .setDescription('Some description here')
                    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                    .addFields({ name: 'Song Name', value: `${song.name}` }, { name: '\u200B', value: '\u200B' }, { name: 'Inline field title', value: 'Some value here', inline: true }, { name: 'Inline field title', value: 'Some value here', inline: true })
                    .addField('Inline field title', `hello!`, true)
                    .setImage('https://i.imgur.com/AfFp7pu.png')
                    .setTimestamp()
                    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            ]
        }));
    }
}
exports.default = PlayerActions;
