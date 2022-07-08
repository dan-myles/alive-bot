"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const Assets_1 = __importDefault(require("../Assets"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
class Help {
    data;
    logger;
    assets;
    constructor() {
        this.logger = new Logger_1.default();
        this.assets = new Assets_1.default();
        this.data = new SlashCommandBuilder()
            .setName('help')
            .setDescription('Shows a helpful prompt');
    }
    async execute(interaction, client) {
        await interaction.reply({
            embeds: [{
                    title: `I heard you needed help :person_tipping_hand:`,
                    description: `Hello, <@${interaction.user.id}>\nThis page shows you all commands available for this build of Alive Music Bot.
                For more in-depth assistance with Alive Music Bot, make sure to join our [Discord](${this.assets.discordInvite})!
                Note: Some of these commands may be disabled by your server administrator.\n\n\n**List of Commands**\n\n` +
                        client.commands.map((cmd) => `\`/${cmd.data.name}\`\n*${cmd.data.description}*\n`).join('\n'),
                    color: this.assets.embedColor,
                    author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL }),
                    footer: ({ text: this.assets.footerText })
                }],
            ephemeral: true
        });
        this.logger.info("Execute /help command: SUCCESS");
    }
}
exports.default = Help;
module.exports = new Help();
