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
            .setDescription('See the status of Alive discord bot!');
    }
    async execute(interaction, client) {
        await interaction.reply('Your bot is up and running!');
        this.logger.info("Executed /status command: SUCCESS");
    }
}
exports.default = Queue;
module.exports = new Queue();
