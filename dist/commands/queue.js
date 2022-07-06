"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const { SlashCommandBuilder } = require('@discordjs/builders');
class Queue {
    data;
    logger;
    constructor() {
        this.logger = new logger_1.default();
        this.data = new SlashCommandBuilder()
            .setName('queue')
            .setDescription('See the current queue');
    }
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);
        await interaction.reply('Current queue:\n' + queue.songs.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"));
    }
}
exports.default = Queue;
module.exports = new Queue();
