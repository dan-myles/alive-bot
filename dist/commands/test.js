"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder } = require('@discordjs/builders');
const log4js = require('log4js');
const logger = log4js.getLogger();
class Test {
    data;
    constructor() {
        this.data = new SlashCommandBuilder()
            .setName('test')
            .setDescription('testcommand123');
    }
    async execute(interaction) {
        await interaction.reply('YOU DID IT!');
        logger.info("Executed /status command: SUCCESS");
    }
}
exports.default = Test;
module.exports = new Test();
