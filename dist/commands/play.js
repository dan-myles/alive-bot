"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv').config();
const log4js = require('log4js');
const logger = log4js.getLogger();
class Play {
    data;
    guildId;
    constructor() {
        this.guildId = process.env.GUILD_ID;
        this.data = new SlashCommandBuilder()
            .setName('play')
            .setDescription('Play music in your voice channel!')
            .addStringOption((option) => option
            .setName('song')
            .setDescription('Enter your URL or song name!')
            .setRequired(true));
    }
    async execute(interaction, client) {
        const recievedMessage = interaction.options.getString('song');
        logger.info("Executed /play command: SUCCESS");
    }
}
exports.default = Play;
module.exports = new Play();
