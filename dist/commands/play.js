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
    logger;
    constructor() {
        this.logger = new logger_1.default();
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
            let message = interaction.member.message;
            client.player.play(voiceChannel, recievedMessage, {
                member: interaction.member,
                textChannel: interaction.member.textChannel,
                message
            });
            let isFound = false;
            const sleep = (ms) => new Promise(r => setTimeout(r, ms));
            while (isFound === false) {
                let queueExists;
                if (typeof (client.player.getQueue(interaction.guildId)) == "undefined") {
                    queueExists = false;
                    this.logger.debug("No existing queue found, building queue...");
                }
                else {
                    queueExists = true;
                    this.logger.debug("Existing queue found!");
                }
                await sleep(1000);
                const queueRequest = client.player.getQueue(interaction.guildId);
                if (typeof (queueRequest) != "undefined") {
                    isFound = true;
                    if (queueRequest.songs.length == 1) {
                        await interaction.reply(`Now Playing: ${queueRequest.songs[0].name}`);
                    }
                    else {
                        let latest = queueRequest.songs[(queueRequest.songs.length - 1)];
                        await interaction.reply(`Added to Queue: ${latest.name}
						Queue Position: ${queueRequest.songs.length}`);
                        this.logger.debug(queueRequest.songs.length);
                    }
                }
            }
            this.logger.info("Executed /play command: SUCCESS");
        }
        else {
            await interaction.reply(`${interaction.user.username}, you must be in a voice channel!`);
            this.logger.warn("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
        }
    }
}
exports.default = Play;
module.exports = new Play();
