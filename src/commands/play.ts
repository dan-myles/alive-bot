export {}
import Logger from "../logger";
const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv').config();


export default class Play {
	public data: any;
	public guildId: any;
	private logger: any;

	constructor() {
		this.logger = new Logger();
		this.guildId = process.env.GUILD_ID;
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
			client.player.play(voiceChannel, recievedMessage, {
				member: interaction.member,
				textChannel: interaction.member.textChannel,
			});
			
			this.logger.info("Executed /play command: SUCCESS"); 
		} else {
			await interaction.reply(`${interaction.user.username}, you must be in a voice channel!`);
			this.logger.warn("Failed executing /play command: USER VOICE CHANNEL NOT FOUND");
		}

	}

}

module.exports = new Play();