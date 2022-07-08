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
			//Queue found
			await interaction.reply({
				embeds: [{
					title: 'Queue',
					description: queue.songs.map((song: any, id: any, url: any) =>
					`**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
					.join("\n"),
					color: this.assets.embedColor,
					author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL }),
					footer: ({ text: this.assets.footerText }),
				}],
				ephemeral: false
			});
			this.logger.info("Executed /queue command: SUCCESS");
			setTimeout(() => interaction.deleteReply(), this.assets.deleteDurationNormal);
		} else {
			//No queue found
			await interaction.reply({
				embeds: [{
					description: `${this.assets.errorEmoji}  |  There is nothing in the queue right now!`,
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