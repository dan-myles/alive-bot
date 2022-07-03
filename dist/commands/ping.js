"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const { SlashCommandBuilder } = require('@discordjs/builders');
class Ping {
    data;
    constructor() {
        this.data = new SlashCommandBuilder().
            setName('ping').
            setDescription('Replies with Pong!');
    }
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}
exports.Ping = Ping;
