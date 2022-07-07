export {}
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



export default class Queue {
	public data: any;
	private logger: any;
	private assets: any;

	constructor() {
		this.logger = new Logger();
		this.assets = new Assets();
		this.data = new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows the current queue');
	}

	public async execute(interaction: any, client: any)  {
        const queue = client.player.getQueue(interaction.guildId);

		if (typeof(queue) != 'undefined') {
			interaction.deferReply();
			interaction.deleteReply();
			this.logger.info("Executed /queue command: SUCCESS")
			interaction.channel.send({
				embeds: [
					new MessageEmbed()
					.setColor(this.assets.embedColor)
					.setTitle('Queue')
					.setDescription(queue.songs.map((song: any, id: any, url: any) =>
					`**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
					.join("\n"))
					.setAuthor({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
					.setTimestamp()
					.setFooter({ text: this.assets.footerText })
				]
			}).then(
				(repliedMessage: any) => {
					setTimeout(() => repliedMessage.delete(), this.assets.deleteDurationNormal)
				}
			);
		} else {
			interaction.reply({
				embeds: [{
					description: `**${this.assets.errorEmoji}  |  <@${interaction.user.id}>, there is nothing in the queue right now!**`,
					color: this.assets.embedErrorColor,
					author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL })
				}],
				ephemeral: true
			});

			this.logger.warn("Failed executing /queue command: NO QUEUE FOUND")
		}
	
	}
}

module.exports = new Queue();