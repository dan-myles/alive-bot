const { SlashCommandBuilder } = require('@discordjs/builders');

export class Ping {
	public data: any;

	constructor() {
		this.data = new SlashCommandBuilder().
		setName('ping').
		setDescription('Replies with Pong!');

	}

	public async execute(interaction: { reply: (arg0: string) => any; })  {
		await interaction.reply('Pong!');
	}
}

