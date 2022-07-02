const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: { reply: (arg0: string) => any; }) {
		await interaction.reply('Pong!');
	},
};

