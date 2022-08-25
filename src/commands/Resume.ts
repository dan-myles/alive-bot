export {};
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

export default class Resume {
  public data: any;
  private logger: any;
  private assets: any;

  constructor() {
    this.logger = new Logger();
    this.assets = new Assets();
    this.data = new SlashCommandBuilder()
      .setName("resume")
      .setDescription("Resumes a paused player");
  }

  public async execute(interaction: any, client: any) {
    const voiceChannel = interaction.member.voice.channel;
    const queue = client.player.getQueue(interaction.guildId);

    if (typeof queue === "undefined") {
      //Existing queue NOT found
      if (voiceChannel) {
        //User voice chanel exists
        await interaction.reply({
          embeds: [
            {
              description: `${this.assets.errorEmoji}  |  I am not in any voice channels!`,
              color: this.assets.embedErrorColor,
              author: {
                name: this.assets.name,
                iconURL: this.assets.logoPFP6,
                url: this.assets.URL,
              },
            },
          ],
          ephemeral: true,
        });

        this.logger.warn("Failed executing /resume command: PLAYER NOT FOUND");
      } else {
        //User is not in a voice channel
        await interaction.reply({
          embeds: [
            {
              description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you are not in a voice channel!`,
              color: this.assets.embedErrorColor,
              author: {
                name: this.assets.name,
                iconURL: this.assets.logoPFP6,
                url: this.assets.URL,
              },
            },
          ],
          ephemeral: true,
        });
        this.logger.warn(
          "Failed executing /resume command: USER VOICE CHANNEL NOT FOUND"
        );
      }
    } else {
      //Existing queue found
      if (voiceChannel) {
        let userId = voiceChannel.id;
        let botId = interaction.guild.me.voice.channel.id;
        if (userId === botId) {
          //User is in same voice as bot
          queue.resume();

          await interaction.reply({
            embeds: [
              {
                description: `:arrow_forward:  |  I have resumed the player!`,
                color: this.assets.embedColor,
                author: {
                  name: this.assets.name,
                  iconURL: this.assets.logoPFP6,
                  url: this.assets.URL,
                },
                footer: { text: this.assets.footerText },
              },
            ],
            ephemeral: false,
          });
          this.logger.info("Executed /resume command: SUCCESS");
          setTimeout(
            () => interaction.deleteReply(),
            this.assets.deleteDurationNormal
          );
        } else {
          //User is NOT in same voice as bot
          await interaction.reply({
            embeds: [
              {
                description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you must be in <#${botId}> to use that command!`,
                color: this.assets.embedErrorColor,
                author: {
                  name: this.assets.name,
                  iconURL: this.assets.logoPFP6,
                  url: this.assets.URL,
                },
              },
            ],
            ephemeral: true,
          });
          this.logger.warn(
            "Failed executing /resume command: USER AND APPLICATION VOICE IDS DO NOT MATCH"
          );
        }
      } else {
        //User is not in a voice channel
        await interaction.reply({
          embeds: [
            {
              description: `${this.assets.errorEmoji}  |  <@${interaction.user.id}>, you are not in a voice channel!`,
              color: this.assets.embedErrorColor,
              author: {
                name: this.assets.name,
                iconURL: this.assets.logoPFP6,
                url: this.assets.URL,
              },
            },
          ],
          ephemeral: true,
        });
        this.logger.warn(
          "Failed executing /resume command: USER VOICE CHANNEL NOT FOUND"
        );
      }
    }
  }
}

module.exports = new Resume();
