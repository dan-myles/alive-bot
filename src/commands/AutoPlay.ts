export {}
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



export default class AutoPlay {
	public data: any;
	private logger: any;
	private assets: any;

	constructor() {
		this.logger = new Logger();
		this.assets = new Assets();
		this.data = new SlashCommandBuilder()
		.setName('autoplay')
		.setDescription('Toggles autoplay on or off');
	}

	public async execute(interaction: any, client: any)  {
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
			}).then(
			    (repliedMessage: any) => {
			        setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal)
			});
		
			this.logger.info("Executed /autoplay command: SUCCESS");
		} else {
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

module.exports = new AutoPlay();