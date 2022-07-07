"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const Assets_1 = __importDefault(require("../Assets"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
class Leave {
    data;
    logger;
    assets;
    constructor() {
        this.logger = new Logger_1.default();
        this.assets = new Assets_1.default();
        this.data = new SlashCommandBuilder()
            .setName('leave')
            .setDescription('Disconnects Alive Music Bot from all voice channels');
    }
    async execute(interaction, client) {
        const getQueue = client.player.getQueue(interaction.guildId);
        if (typeof (getQueue) != 'undefined') {
            interaction.reply({
                embeds: [{
                        description: `**${this.assets.successEmoji}  |  I have left all voice channels!**`,
                        color: this.assets.embedSuccessColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    }],
                ephemeral: true
            });
            client.player.voices.leave(interaction.guildId);
            this.logger.warn("Failed executing /leave command: QUEUE IS UNDEFINED");
        }
        else {
            interaction.reply({
                embeds: [{
                        description: `**${this.assets.errorEmoji}  |  <@${interaction.user.id}>, I am not in any voice channels!**`,
                        color: this.assets.embedErrorColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    }],
                ephemeral: true
            });
            this.logger.info("Execute /leave command: SUCCESS");
        }
    }
}
exports.default = Leave;
module.exports = new Leave();
