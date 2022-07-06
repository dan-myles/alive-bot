"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder } = require('@discordjs/builders');
const log4js = require('log4js');
const logger = log4js.getLogger();
class Status {
    data;
    constructor() {
        this.data = new SlashCommandBuilder()
            .setName('status')
            .setDescription('The bot is up and running!');
    }
    async execute(interaction, client) {
        await interaction.reply('Pong!');
        logger.info("Executed /status command: SUCCESS");
    }
}
exports.default = Status;
module.exports = new Status();
