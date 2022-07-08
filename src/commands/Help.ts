export {}
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



export default class Help {
	public data: any;
	private logger: any;
	private assets: any;

	constructor() {
		this.logger = new Logger();
		this.assets = new Assets();
		this.data = new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows a helpful prompt');
	}

	public async execute(interaction: any, client: any)  {
        interaction.reply({
            embeds: [{
                title: `I heard you needed help :person_tipping_hand:`,
                description: `Hello, <@${interaction.user.id}>\nThis page shows you all commands available for this build of Alive Music Bot.
                For more in-depth assistance with Alive Music Bot, make sure to join our [Discord](${this.assets.discordInvite})!
                Note: Some of these commands may be disabled by your server administrator.\n\n\n**List of Commands**\n\n` + 
                client.commands.map((cmd: any) => `\`/${cmd.data.name}\`\n*${cmd.data.description}*\n`).join('\n'),
                color: this.assets.embedColor,
                author: ({ name: this.assets.name, iconURL: this.assets.logoPFP6, url: this.assets.URL }),
                footer: ({ text: this.assets.footerText })
            }],
            ephemeral: true
        });
        this.logger.info("Execute /help command: SUCCESS");
    }
}

module.exports = new Help();