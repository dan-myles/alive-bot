"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const { SlashCommandBuilder } = require('@discordjs/builders');
class Status {
    data;
    logger;
    constructor() {
        this.logger = new Logger_1.default();
        this.data = new SlashCommandBuilder()
            .setName('status')
            .setDescription('See the status of Alive discord bot!');
    }
    async execute(interaction, client) {
        await interaction.reply('Your bot is up and running!');
        this.logger.info("Executed /status command: SUCCESS");
    }
}
exports.default = Status;
module.exports = new Status();
