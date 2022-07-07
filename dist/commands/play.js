"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv').config();
class Play {
    data;
    logger;
    constructor() {
        this.logger = new Logger_1.default();
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
        const testQueue = client.player.getQueue(interaction.guildId);
        if (typeof (testQueue) === 'undefined') {
            //Existing queue NOT found
            if (voiceChannel) {
                interaction.deferReply();
                interaction.deleteReply();
                client.player.play(voiceChannel, recievedMessage, {
                    member: interaction.member,
                    textChannel: interaction.channel
                });
                this.logger.info("Executed /play command: SUCCESS");
            }
            else {
                interaction.reply({
                    content: `<@${interaction.user.id}>, you must be in a voice channel!`,
                    ephemeral: true
                });
                this.logger.warn("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
            }
        }
        else {
            //Existing queue found
            if (voiceChannel) {
                let userId = voiceChannel.id;
                let botId = interaction.guild.me.voice.channel.id;
                if (userId === botId) {
                    interaction.deferReply();
                    interaction.deleteReply();
                    client.player.play(voiceChannel, recievedMessage, {
                        member: interaction.member,
                        textChannel: interaction.channel
                    });
                    this.logger.info("Executed /play command: SUCCESS");
                }
                else {
                    interaction.reply({
                        content: `<@${interaction.user.id}>, you must be in <#${botId}> to use that command!`,
                        ephemeral: true
                    });
                    this.logger.warn("Failed executing /play command: USER AND APPLICATION VOICE IDS DO NOT MATCH");
                }
            }
            else {
                interaction.reply({
                    content: `<@${interaction.user.id}>, you must be in a voice channel!`,
                    ephemeral: true
                });
                this.logger.warn("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
            }
        }
    }
}
exports.default = Play;
module.exports = new Play();
