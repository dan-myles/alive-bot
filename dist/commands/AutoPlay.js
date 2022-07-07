"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const Assets_1 = __importDefault(require("../Assets"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
class AutoPlay {
    data;
    logger;
    assets;
    constructor() {
        this.logger = new Logger_1.default();
        this.assets = new Assets_1.default();
        this.data = new SlashCommandBuilder()
            .setName('autoplay')
            .setDescription('Toggles autoplay on or off');
    }
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);
        if (queue) {
            interaction.deferReply();
            interaction.deleteReply();
            const autoPlay = queue.toggleAutoplay();
            interaction.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(this.assets.embedColor)
                        .setDescription(`**Auto-Play has been turned:** \`${autoPlay ? 'On' : 'Off'}\``)
                        .setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                        .setTimestamp()
                        .setFooter({ text: this.assets.footerText })
                ]
            }).then((repliedMessage) => {
                setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal);
            });
            this.logger.info("Executed /autoplay command: SUCCESS");
        }
        else {
            interaction.reply({
                embeds: [{
                        description: `**${this.assets.errorEmoji}  |  <@${interaction.user.id}>, there is nothing playing right now!**`,
                        color: this.assets.embedErrorColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    }],
                ephemeral: true
            });
            this.logger.warn("Failed executing /autoplay command: NO QUEUE FOUND");
        }
    }
}
exports.default = AutoPlay;
module.exports = new AutoPlay();
