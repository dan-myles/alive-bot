export {}
import { syncBuiltinESMExports } from "module";
import Logger from "../logger";
const { SlashCommandBuilder } = require('@discordjs/builders');
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

		if (voiceChannel) {
			let message = interaction.member.message;
			client.player.play(voiceChannel, recievedMessage, {
				member: interaction.member,
				textChannel: interaction.member.textChannel,
				message
			});

			let isFound: any = false;
			const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));
			while (isFound === false) {
				let queueExists;
				if (typeof(client.player.getQueue(interaction.guildId)) == "undefined") {
					queueExists = false;
					this.logger.debug("No existing queue found, building queue...")
				} else {
					queueExists = true;
					this.logger.debug("Existing queue found!")
				}

                await sleep(1000);
				const queueRequest = client.player.getQueue(interaction.guildId);

				if (typeof(queueRequest) != "undefined") {
					isFound = true;
					if (queueRequest.songs.length == 1) {
						//queue found and playing FIRST element
						await interaction.reply(`Now Playing: ${queueRequest.songs[0].name}`);
					} else {
						//added song to queue
						let latest = queueRequest.songs[(queueRequest.songs.length - 1)];
						await interaction.reply(`Added to Queue: ${latest.name}
						Queue Position: ${queueRequest.songs.length}`);
						this.logger.debug(`Queue Length: ${queueRequest.songs.length}`);
					}
				}
			}

			
			

			this.logger.info("Executed /play command: SUCCESS"); 
		} else {
			await interaction.reply(`${interaction.user.username}, you must be in a voice channel!`);
			this.logger.warn("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
		}

	}

}

module.exports = new Play();