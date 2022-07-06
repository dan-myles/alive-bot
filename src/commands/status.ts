export {}
const { SlashCommandBuilder } = require('@discordjs/builders');
const log4js = require('log4js');

const logger = log4js.getLogger();


export default class Status {
	public data: any;

	constructor() {
		this.data = new SlashCommandBuilder()
		.setName('status')
		.setDescription('The bot is up and running!');

	}

	public async execute(interaction: { reply: (arg0: string) => any; }, client: any)  {
		await interaction.reply('Pong!');
		logger.info("Executed /status command: SUCCESS"); 
	}

}

module.exports = new Status();