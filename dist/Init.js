"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init = void 0;
const handler_1 = require("./handler");
const logger_1 = __importDefault(require("./logger"));
const { Client, Intents, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlughin } = require('@distube/soundcloud');
const dotenv = require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
//Main Class
class Init {
    token;
    logger;
    registrar;
    //Reading token from .env file
    constructor() {
        this.logger = new logger_1.default();
        this.registrar = new handler_1.LocalDeployCommands();
        this.logger.debug("Initializing discord token from .env file...");
        this.token = process.env.DISCORD_TOKEN;
    }
    //MAIN START FUNCTION
    startApplication() {
        //Registering slash commands
        this.registrar.registerCommands();
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
            searchSongs: 5,
            searchCooldown: 10,
            leaveOnEmpty: true,
            leaveOnFinish: true,
            leaveOnStop: false,
        });
        client.player = player;
        //Dynamically loading commands
        this.logger.debug("Dynamically loading commands...");
        client.commands = new Collection();
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath);
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            this.logger.debug("Loaded command file " + file);
            client.commands.set(command.data.name, command);
        }
        //Dynamically loading events
        const eventsPath = path.join(__dirname, 'events');
        const evenFiles = fs.readdirSync(eventsPath);
        for (const file of evenFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            this.logger.debug(`Loading event file: ${file}`);
            if (event.once) {
                client.once(event.name, () => event.execute(client));
            }
            else {
                client.on(event.name, async (interaction) => event.execute(interaction, client));
            }
        }
        //Logging into discord         
        this.logger.debug("Authenticating your clients token...");
        client.login(this.token);
    }
}
exports.Init = Init;
