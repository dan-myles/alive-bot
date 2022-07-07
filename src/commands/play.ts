export {}
import { syncBuiltinESMExports } from "module";
import test from "node:test";
import Logger from "../Logger";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv').config();


export default class Play {
	public data: any;
	private logger: any;

	constructor() {
		this.logger = new Logger();
		this.data = new SlashCommandBuilder()
			.setName('play')
			.setDescription('Play music in your voice channel!')
			.addStringOption((option: { 
				setName: (arg0: string) => 
				{ (): any; new(): any; 
					setDescription: 
					{ (arg0: string): { (): any; new(): any; 
						setRequired: 
						{ (arg0: boolean): any; new(): any; }; }; new(): any; }; }; }) => 
					option
						.setName('song')
						.setDescription('Enter your URL or song name!')
						.setRequired(true));
	}

	public async execute(interaction: any, client: any)  {
		const recievedMessage = interaction.options.getString('song');
		const voiceChannel = interaction.member.voice.channel;
		const testQueue = client.player.getQueue(interaction.guildId);

		if (typeof(testQueue) === 'undefined') {
			//Existing queue NOT found
			if (voiceChannel) {
				interaction.deferReply();
				interaction.deleteReply();
				client.player.play(voiceChannel, recievedMessage, {
					member: interaction.member,
					textChannel: interaction.channel
				});
				this.logger.info("Executed /play command: SUCCESS"); 
			} else {
				//User is not in a voice channel
				interaction.reply({
					content: `<@${interaction.user.id}>, you must be in a voice channel!`,
					ephemeral: true
				});
				this.logger.warn("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
			}
		} else {
			//Existing queue found
			if (voiceChannel) {
				let userId = voiceChannel.id;
				let botId = interaction.guild.me.voice.channel.id;
				if (userId === botId) {
					//User is in same voice as bot
					interaction.deferReply();
					interaction.deleteReply();
					client.player.play(voiceChannel, recievedMessage, {
						member: interaction.member,
						textChannel: interaction.channel
					});
					this.logger.info("Executed /play command: SUCCESS"); 

				} else {
					//User is NOT in same voice as bot
					interaction.reply({
						content: `<@${interaction.user.id}>, you must be in <#${botId}> to use that command!`,
						ephemeral: true
					});
					this.logger.warn("Failed executing /play command: USER AND APPLICATION VOICE IDS DO NOT MATCH")
				}
			} else {
				//User is not in a voice channel
				interaction.reply({
					content: `<@${interaction.user.id}>, you must be in a voice channel!`,
					ephemeral: true
				});
				this.logger.warn("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
			}
		}
	}

}

module.exports = new Play();