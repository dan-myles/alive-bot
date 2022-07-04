export {}
const { SlashCommandBuilder } = require('@discordjs/builders');

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('ping')
// 		.setDescription('Replies with Pong!'),
// 	async execute(interaction: { reply: (arg0: string) => any; }) {
// 		return interaction.reply('Pong!');
// 	},
// };


export default class Ping {
	public data: any;

	constructor() {
		this.data = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!');

	}

	public async execute(interaction: { reply: (arg0: string) => any; })  {
		await interaction.reply('Pong!');
	}

}

module.exports = new Ping();