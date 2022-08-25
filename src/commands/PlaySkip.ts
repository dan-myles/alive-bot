export {};
import Logger from "../Logger";
import Assets from "../Assets";
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

export default class PlaySkip {
  public data: any;
  private logger: any;
  private assets: any;

  constructor() {
    this.logger = new Logger();
    this.assets = new Assets();
    this.data = new SlashCommandBuilder()
      .setName("playskip")
      .setDescription("Plays a song at the front of the queue")
      .addStringOption(
        (option: {
          setName: (arg0: string) => {
            (): any;
            new (): any;
            setDescription: {
              (arg0: string): {
                (): any;
                new (): any;
                setRequired: { (arg0: boolean): any; new (): any };
              };
              new (): any;
            };
          };
        }) =>
          option
            .setName("song")
            .setDescription("Enter your URL or song name!")
            .setRequired(true)
      );
  }

  public async execute(interaction: any, client: any) {
    const recievedMessage = interaction.options.getString("song");
    const voiceChannel = interaction.member.voice.channel;
    const queue = client.player.getQueue(interaction.guildId);

    if (typeof queue === "undefined") {
      //Existing queue NOT found
      if (voiceChannel) {
        await interaction.deferReply();
        await interaction.deleteReply();
        client.player.play(voiceChannel, recievedMessage, {
          member: interaction.member,
          textChannel: interaction.channel,
          skip: true,
        });
        this.logger.info("Executed /playskip command: SUCCESS");
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
          "Failed executing /playskip command: USER VOICE CHANNEL NOT FOUND"
        );
      }
    } else {
      //Existing queue found
      if (voiceChannel) {
        let userId = voiceChannel.id;
        let botId = interaction.guild.me.voice.channel.id;
        if (userId === botId) {
          //User is in same voice as bot
          interaction.deferReply();
          await interaction.deleteReply();
          client.player.play(voiceChannel, recievedMessage, {
            member: interaction.member,
            textChannel: interaction.channel,
            skip: true,
          });
          this.logger.info("Executed /playskip command: SUCCESS");
        } else {
          //User is NOT in same voice as bot
          interaction.reply({
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
            "Failed executing /playskip command: USER AND APPLICATION VOICE IDS DO NOT MATCH"
          );
        }
      } else {
        //User is not in a voice channel
        interaction.reply({
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
          "Failed executing /playskip command: USER VOICE CHANNEL NOT FOUND"
        );
      }
    }
  }
}

module.exports = new PlaySkip();
