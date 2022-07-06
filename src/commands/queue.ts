export {}
import Logger from "../logger";
const { SlashCommandBuilder } = require('@discordjs/builders');


export default class Queue {
	public data: any;
	private logger: any;

	constructor() {
		this.logger = new Logger();
		this.data = new SlashCommandBuilder()
		.setName('queue')
		.setDescription('See the current queue');

	}

	public async execute(interaction: any, client: any)  {
        const queue = client.player.getQueue(interaction.guildId);

        await interaction.reply('Current queue:\n' + queue.songs.map((song: { name: any; url: any; formattedDuration: any; }, id: number) =>
            `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
        ).join("\n"));

        



	}

}

module.exports = new Queue();