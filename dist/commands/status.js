"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder } = require('@discordjs/builders');
class Status {
    data;
    logger;
    constructor() {
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
