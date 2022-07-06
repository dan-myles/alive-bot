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
		.setDescription('See the status of Alive discord bot!');

	}

	public async execute(interaction: any, client: any)  {
        const queue = client.player.getQueue();
	}

}

module.exports = new Queue();