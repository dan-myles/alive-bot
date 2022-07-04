export {}
const { SlashCommandBuilder } = require('@discordjs/builders');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('pipple')
		.setDescription('Replies with pipple'),
	async execute(interaction: { reply: (arg0: string) => any; }) {
		return interaction.reply('pipple');
	},
};
