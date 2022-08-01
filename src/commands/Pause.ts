export { }
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



export default class Pause {
    public data: any;
    private logger: any;
    private assets: any;

    constructor() {
        this.logger = new Logger();
        this.assets = new Assets();
        this.data = new SlashCommandBuilder()
            .setName('pause')
            .setDescription('Pauses the player');
    }

    public async execute(interaction: any, client: any) {
        const voiceChannel = interaction.member.voice.channel;
        const queue = client.player.getQueue(interaction.guildId);

        if (typeof (queue) === 'undefined') {
            //Existing queue NOT found
            if (voiceChannel) {
                //voice chanel exists
                await interaction.reply({
                    embeds: [{
                        description: `${this.assets.errorEmoji}  |  There is nothing in to pause right now!`,
                        color: this.assets.embedErrorColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    }],
                    ephemeral: true
                });

                this.logger.warn("Failed executing /pause command: PLAYER NOT FOUND")
            } else {
                //User is not in a voice channel
                await interaction.reply({
                    embeds: [{
                        description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you are not in a voice channel!`,
                        color: this.assets.embedErrorColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    }],
                    ephemeral: true
                });
                this.logger.warn("Failed executing /pause command: USER VOICE CHANNEL NOT FOUND");
            }
        } else {
            //Existing queue found
            if (voiceChannel) {
                let userId = voiceChannel.id;
                let botId = interaction.guild.me.voice.channel.id;
                if (userId === botId) {
                    //User is in same voice as bot
                    queue.pause();

                    await interaction.reply({
                        embeds: [{
                            description: `:pause_button:  |  Paused the player.`,
                            color: this.assets.embedColor,
                            author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL }),
                            footer: ({ text: this.assets.footerText })
                        }],
                        ephemeral: false
                    });
                    this.logger.info("Executed /pause command: SUCCESS");
                    setTimeout(() => interaction.deleteReply(), this.assets.deleteDurationNormal);
                } else {
                    //User is NOT in same voice as bot
                    await interaction.reply({
                        embeds: [{
                            description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you must be in <#${botId}> to use that command!`,
                            color: this.assets.embedErrorColor,
                            author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                        }],
                        ephemeral: true
                    });
                    this.logger.warn("Failed executing /pause command: USER AND APPLICATION VOICE IDS DO NOT MATCH")
                }
            } else {
                //User is not in a voice channel
                await interaction.reply({
                    embeds: [{
                        description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you are not in a voice channel!`,
                        color: this.assets.embedErrorColor,
                        author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                    }],
                    ephemeral: true
                });
                this.logger.warn("Failed executing /pause command: USER VOICE CHANNEL NOT FOUND");
            }
        }

    }
}

module.exports = new Pause();
