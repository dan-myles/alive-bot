export {};
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

export default class Previous {
  public data: any;
  private logger: any;
  private assets: any;

  constructor() {
    this.logger = new Logger();
    this.assets = new Assets();
    this.data = new SlashCommandBuilder()
      .setName("previous")
      .setDescription("Plays the previous song in the queue");
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

        this.logger.warn(
          "Failed executing /previous command: PLAYER NOT FOUND"
        );
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
          "Failed executing /previous command: USER VOICE CHANNEL NOT FOUND"
        );
      }
    } else {
      //Existing queue found
      if (voiceChannel) {
        let userId = voiceChannel.id;
        let botId = interaction.guild.me.voice.channel.id;
        if (userId === botId) {
          //User is in same voice as bot
          let previous = queue.previousSongs;

          if (previous.length != 0) {
            //Previous songs are found
            let song = queue.previous();

            await interaction.reply({
              embeds: [
                {
                  description: `:rewind:  | Started playing the previous song!\n*Requested by:* <@${interaction.user.id}>`,
                  color: this.assets.embedColor,
                  author: {
                    name: this.assets.name,
                    iconURL: this.assets.logoPFP6,
                    url: this.assets.URL,
                  },
                },
              ],
              ephemeral: false,
            });
            this.logger.info("Executed /previous command: SUCCESS");
            setTimeout(
              () => interaction.deleteReply(),
              this.assets.deleteDurationNormal
            );
          } else {
            //No previous song exists
            await interaction.reply({
              embeds: [
                {
                  description: `${this.assets.errorEmoji}  |  No previous song found!`,
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
              "Failed executing /previous command: NO PREVIOUS SONG FOUND"
            );
          }
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
            "Failed executing /previous command: USER AND APPLICATION VOICE IDS DO NOT MATCH"
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
          "Failed executing /previous command: USER VOICE CHANNEL NOT FOUND"
        );
      }
    }
  }
}

module.exports = new Previous();
