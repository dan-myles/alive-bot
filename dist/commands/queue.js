"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const Assets_1 = __importDefault(require("../Assets"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
class Queue {
    data;
    logger;
    assets;
    constructor() {
        this.logger = new Logger_1.default();
        this.assets = new Assets_1.default();
        this.data = new SlashCommandBuilder()
            .setName('queue')
            .setDescription('Shows the current queue');
    }
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);
        if (typeof (queue) != 'undefined') {
            //Queue found
            interaction.reply({
                embeds: [{
                        title: 'Queue',
                        description: queue.songs.map((song, id, url) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
                            .join("\n"),
                        color: this.assets.embedColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL }),
                        footer: ({ text: this.assets.footerText }),
                    }],
                ephemeral: false
            });
            this.logger.info("Executed /queue command: SUCCESS");
            setTimeout(() => interaction.deleteReply(), this.assets.deleteDurationNormal);
        }
        else {
            //No queue found
            interaction.reply({
                embeds: [{
                        description: `${this.assets.errorEmoji}  |  There is nothing in the queue right now!`,
                        color: this.assets.embedErrorColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    }],
                ephemeral: true
            });
            this.logger.warn("Failed executing /queue command: NO QUEUE FOUND");
        }
    }
}
exports.default = Queue;
module.exports = new Queue();
