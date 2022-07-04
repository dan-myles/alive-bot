"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pipple')
        .setDescription('Replies with pipple'),
    async execute(interaction) {
        return interaction.reply('pipple');
    },
};
