import { isObject } from "util";
import { LocalDeployCommands } from "./handler";
import Play from "./commands/play";
import Logger from "./logger";

const { Client, Intents, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlughin } = require('@distube/soundcloud');

const dotenv = require('dotenv').config();
const fs = require('node:fs');
const path = require ('node:path');




//Main Class
export class Init {
    private readonly token: string;
    private logger: any;
    private registrar: any;

    //Reading token from .env file
    constructor() {
        this.logger = new Logger();
        this.registrar = new LocalDeployCommands();

        this.logger.debug("Initializing discord token from .env file...")
        this.token = process.env.DISCORD_TOKEN;
    }

    //MAIN START FUNCTION
    public startApplication() {
        //Registering slash commands
        this.registrar.registerCommands();
        
        //Starting client
        this.logger.debug("Attempting to create a new client instance...")
        const client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        });

        //Starting Music Core
        const player = new DisTube(client, {
            searchSongs: 5,
            searchCooldown: 10,
            leaveOnEmpty: true,
            leaveOnFinish: true,
            leaveOnStop: false,
        });
        client.player = player;
        
        //Dynamically loading commands
        this.logger.debug("Dynamically loading commands...")
        client.commands = new Collection();
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath);

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            this.logger.debug("Loaded command file " + file);

            client.commands.set(command.data.name, command);
        }

        //Dynamically loading discord events
        const discordEventsPath = path.join(__dirname, 'events');
        const discordEventFiles = fs.readdirSync(discordEventsPath);

        for (const file of discordEventFiles) {
            const filePath = path.join(discordEventsPath, file);
            const event = require(filePath);
            this.logger.debug(`Loading event file: ${file}`);

            if (event.once) {
                client.once(event.name, () => event.execute(client));
            } else {
                client.on(event.name, async (interaction: any) => 
                event.execute(interaction, client));
            }
        }
        client.player.on("addSong", (queue: any, song: any) => queue.textChannel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}.`
        ));

        // Dynamically loading player events
        // const playerEventsPath = path.join(__dirname, 'playerActions');
        // const playerEventFiles = fs.readdirSync(playerEventsPath);

        // for (const file of discordEventFiles) {
        //     const playerFilePath = path.join(playerEventsPath, file);
        //     const playerEvent = require(playerFilePath);
        //     this.logger.debug(`Loading player event file: ${file}`);

        //     client.player.on(playerEvent.name, async (interaction: any) => 
        //     playerEvent.execute(interaction, client));
        // }

        //Logging into discord         
        this.logger.debug("Authenticating your clients token...");
        client.login(this.token);
    }
}