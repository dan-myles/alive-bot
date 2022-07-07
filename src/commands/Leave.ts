export {}
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



export default class Leave {
	public data: any;
	private logger: any;
	private assets: any;

	constructor() {
		this.logger = new Logger();
		this.assets = new Assets();
		this.data = new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Disconnects Alive Music Bot from all voice channels');
	}

	public async execute(interaction: any, client: any)  {
        const getQueue = client.player.getQueue(interaction.guildId);

        if (typeof(getQueue) != 'undefined') {
            interaction.reply({
                embeds: [{
                    description: `**${this.assets.successEmoji}  |  I have left all voice channels!**`,
                    color: this.assets.embedColor,
                    author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
                }],
                ephemeral: true
            });
            client.player.voices.leave(interaction.guildId);
            this.logger.warn("Failed executing /leave command: QUEUE IS UNDEFINED");
        } else {
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

module.exports = new Leave();