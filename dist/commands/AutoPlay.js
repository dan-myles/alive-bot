"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const Assets_1 = __importDefault(require("../Assets"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
class AutoPlay {
    data;
    logger;
    assets;
    constructor() {
        this.logger = new Logger_1.default();
        this.assets = new Assets_1.default();
        this.data = new SlashCommandBuilder()
            .setName('autoplay')
            .setDescription('Toggles autoplay on or off');
    }
    async execute(interaction, client) {
        interaction.deferReply();
        interaction.deleteReply();
        const queue = client.player.getQueue(interaction.guildId);
        if (typeof (queue) != 'undefined') {
            this.logger.info("Executed /queue command: SUCCESS");
            interaction.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(this.assets.embedColor)
                        .setTitle('Queue')
                        .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                        .addFields({ name: `\u200B`, value: queue.songs.map((song, id, url) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
                            .join("\n") })
                        .setTimestamp()
                        .setFooter({ text: this.assets.footerText })
                ]
            }).then((repliedMessage) => {
                setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal);
            });
        }
        else {
            this.logger.warn("Failed executing /queue command: NO QUEUE FOUND");
            interaction.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(this.assets.embedColor)
                        .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                        .addFields({ name: 'There is currently no queue playing!', value: `There has to be a queue playing in order to use the /queue command.` })
                        .setTimestamp()
                        .setFooter({ text: this.assets.footerText })
                ]
            }).then((repliedMessage) => {
                setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal);
            });
        }
    }
}
exports.default = AutoPlay;
module.exports = new AutoPlay();
