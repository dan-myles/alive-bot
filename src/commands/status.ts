export {};
import Logger from "../Logger";
const { SlashCommandBuilder } = require("@discordjs/builders");

export default class Status {
  public data: any;
  private logger: any;

  constructor() {
    this.logger = new Logger();
    this.data = new SlashCommandBuilder()
      .setName("status")
      .setDescription("Checks the status of Alive Music Bot");
  }

  public async execute(interaction: any, client: any) {
    await interaction.reply("Your bot is up and running!");
    this.logger.info("Executed /status command: SUCCESS");
  }
}

module.exports = new Status();
