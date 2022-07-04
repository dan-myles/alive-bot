"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder } = require('@discordjs/builders');
// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('ping')
// 		.setDescription('Replies with Pong!'),
// 	async execute(interaction: { reply: (arg0: string) => any; }) {
// 		return interaction.reply('Pong!');
// 	},
// };
class Ping {
    data;
    constructor() {
        this.data = new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with pong!');
    }
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}
exports.default = Ping;
module.exports = new Ping();
