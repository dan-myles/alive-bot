export {}
const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv').config();
const log4js = require('log4js');

const logger = log4js.getLogger();


export default class Play {
	public data: any;
	public guildId: any;

	constructor() {
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

	public async execute(
		interaction: {
			guild_id: any;
			reply: any;
			options: any;
			member: any;
			guild: any; 
		}, 
		client: any)  {
		const recievedMessage = interaction.options.getString('song');


		
		logger.info("Executed /play command: SUCCESS"); 
	}

}

module.exports = new Play();