export {}
import Logger from "../logger";
const { SlashCommandBuilder } = require('@discordjs/builders');


export default class Status {
	public data: any;
	private logger: any;

	constructor() {
		this.data = new SlashCommandBuilder()
		.setName('status')
		.setDescription('See the status of Alive discord bot!');

	}

	public async execute(interaction: { reply: (arg0: string) => any; }, client: any)  {
		await interaction.reply('Your bot is up and running!');
		this.logger.info("Executed /status command: SUCCESS"); 
	}

}

module.exports = new Status();