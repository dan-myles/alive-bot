"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
const Assets_1 = __importDefault(require("../Assets"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
class Skip {
    data;
    logger;
    assets;
    constructor() {
        this.logger = new Logger_1.default();
        this.assets = new Assets_1.default();
        this.data = new SlashCommandBuilder()
            .setName('skip')
            .setDescription('Skips the current song playing');
    }
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const queue = client.player.getQueue(interaction.guildId);
        if (typeof (queue) === 'undefined') {
            //Existing queue NOT found
            if (voiceChannel) {
                //User voice chanel exists
                interaction.reply({
                    embeds: [{
                            description: `${this.assets.errorEmoji}  |  I am not in any voice channels!`,
                            color: this.assets.embedErrorColor,
                            author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                        }],
                    ephemeral: true
                });
                this.logger.warn("Failed executing /skip command: PLAYER NOT FOUND");
            }
            else {
                //User is not in a voice channel
                interaction.reply({
                    embeds: [{
                            description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you are not in a voice channel!`,
                            color: this.assets.embedErrorColor,
                            author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                        }],
                    ephemeral: true
                });
                this.logger.warn("Failed executing /skip command: USER VOICE CHANNEL NOT FOUND");
            }
        }
        else {
            //Existing queue found
            if (voiceChannel) {
                let userId = voiceChannel.id;
                let botId = interaction.guild.me.voice.channel.id;
                if (userId === botId) {
                    //User is in same voice as bot
                    try {
                        const song = await queue.skip();
                        interaction.reply({
                            embeds: [{
                                    description: `${this.assets.successEmoji}  |  I have skipped the current song!`,
                                    color: this.assets.embedColor,
                                    author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL }),
                                    footer: ({ text: this.assets.footerText })
                                }],
                            ephemeral: false
                        });
                        this.logger.info("Executed /skip command: SUCCESS");
                        setTimeout(() => interaction.deleteReply(), this.assets.deleteDurationNormal);
                    }
                    catch (error) {
                        interaction.reply({
                            embeds: [{
                                    description: `${this.assets.errorEmoji}  |  ${error}`,
                                    color: this.assets.embedColor,
                                    author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL }),
                                }],
                            ephemeral: true
                        });
                        this.logger.warn("Failed executing /skip command: UNHANDLED ERROR");
                    }
                }
                else {
                    //User is NOT in same voice as bot
                    interaction.reply({
                        embeds: [{
                                description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you must be in <#${botId}> to use that command!`,
                                color: this.assets.embedErrorColor,
                                author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                            }],
                        ephemeral: true
                    });
                    this.logger.warn("Failed executing /skip command: USER AND APPLICATION VOICE IDS DO NOT MATCH");
                }
            }
            else {
                //User is not in a voice channel
                interaction.reply({
                    embeds: [{
                            description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you are not in a voice channel!`,
                            color: this.assets.embedErrorColor,
                            author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                        }],
                    ephemeral: true
                });
                this.logger.warn("Failed executing /skip command: USER VOICE CHANNEL NOT FOUND");
            }
        }
    }
}
exports.default = Skip;
module.exports = new Skip();
