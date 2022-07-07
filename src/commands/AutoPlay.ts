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
		interaction.deferReply();
		interaction.deleteReply();
        const queue = client.player.getQueue(interaction.guildId);

		if (typeof(queue) != 'undefined') {
			this.logger.info("Executed /queue command: SUCCESS")
			interaction.channel.send({
				embeds: [
					new MessageEmbed()
					.setColor(this.assets.embedColor)
					.setTitle('Queue')
					.setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
					.addFields(
						{ name: `\u200B`, value: queue.songs.map((song: any, id: any, url: any) =>
						`**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
						.join("\n")},
					)
					.setTimestamp()
					.setFooter({ text: this.assets.footerText })
				]
			}).then(
				(repliedMessage: any) => {
					setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal)
				}
			);
		} else {
			this.logger.warn("Failed executing /queue command: NO QUEUE FOUND")
			interaction.channel.send({
				embeds: [
					new MessageEmbed()
					.setColor(this.assets.embedColor)
					.setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
					.addFields(
						{ name: 'There is currently no queue playing!', value: `There has to be a queue playing in order to use the /queue command.` },
					)
					.setTimestamp()
					.setFooter({ text: this.assets.footerText })
				]
			}).then(
				(repliedMessage: any) => {
					setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal)
				}
			);

		}
	
	}
}

module.exports = new AutoPlay();