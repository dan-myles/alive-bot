"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv').config();
class Play {
    data;
    guildId;
    logger;
    constructor() {
        this.logger = new logger_1.default();
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
        const voiceChannel = interaction.member.voice.channel;
        if (voiceChannel) {
            client.player.play(voiceChannel, recievedMessage);
            await interaction.reply(` test test started playing: ${recievedMessage}`);
            this.logger.info("Executed /play command: SUCCESS");
        }
        else {
            await interaction.reply(`${interaction.user.username}, you must be in a voice channel!`);
            this.logger.error("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
        }
    }
}
exports.default = Play;
module.exports = new Play();
