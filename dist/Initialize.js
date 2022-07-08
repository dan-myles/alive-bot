"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
const Handler_1 = __importDefault(require("./Handler"));
const PlayerActions_1 = __importDefault(require("./PlayerActions"));
const { Client, Intents, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlughin } = require('@distube/soundcloud');
const dotenv = require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
//Main Class
class Initialize {
    token;
    logger;
    handler;
    playerActions;
    //Reading token from .env file
    constructor() {
        this.logger = new Logger_1.default();
        this.handler = new Handler_1.default();
        this.playerActions = new PlayerActions_1.default();
        this.logger.debug("Initializing discord token from .env file...");
        this.token = process.env.DISCORD_TOKEN;
    }
    //MAIN START FUNCTION
    startApplication() {
        //Registering slash commands
        this.handler.registerCommands();
        //Starting client
        this.logger.debug("Attempting to create a new client instance...");
        const client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        });
        //Starting Music Core
        const player = new DisTube(client, {
            plugins: [
                new SpotifyPlugin({
                    parallel: true,
                    emitEventsAfterFetching: true,
                })
            ],
            searchSongs: 5,
            searchCooldown: 5,
            emptyCooldown: 15,
            leaveOnEmpty: true,
            leaveOnFinish: true,
            leaveOnStop: false,
        });
        client.player = player;
        //Dynamically loading commands
        this.logger.debug("Dynamically loading commands...");
        client.commands = new Collection();
        const discordCommandsPath = path.join(__dirname, 'commands');
        const discordCommandFiles = fs.readdirSync(discordCommandsPath);
        for (const file of discordCommandFiles) {
            const filePath = path.join(discordCommandsPath, file);
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
            }
            else {
                client.on(event.name, async (interaction) => event.execute(interaction, client));
            }
        }
        //Loading player events
        this.playerActions.startPlayerEventListener(client);
        //Logging into discord         
        this.logger.debug("Authenticating your clients token...");
        client.login(this.token);
    }
}
exports.default = Initialize;
