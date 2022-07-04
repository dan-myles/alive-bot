export {}
const { SlashCommandBuilder } = require('@discordjs/builders');
const log4js = require('log4js');

const logger = log4js.getLogger();


export default class Test {
	public data: any;

	constructor() {
		this.data = new SlashCommandBuilder()
		.setName('test')
		.setDescription('testcommand123');

	}

	public async execute(interaction: { reply: (arg0: string) => any; })  {
		await interaction.reply('YOU DID IT!');
		logger.info("Executed /status command: SUCCESS"); 
	}

}

module.exports = new Test();