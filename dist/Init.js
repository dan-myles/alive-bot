"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init = void 0;
const handler_1 = require("./handler");
const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv').config();
const log4js = require('log4js');
const fs = require('node:fs');
const path = require('node:path');
const logger = log4js.getLogger();
const registrar = new handler_1.LocalDeployCommands();
//Main Class
class Init {
    token;
    //Reading token from .env file
    constructor() {
        logger.level = "ALL";
        logger.debug("Initializing discord token from .env file...");
        this.token = process.env.DISCORD_TOKEN;
    }
    //MAIN START FUNCTION
    startApplication() {
        //Registering slash commands
        registrar.registerCommands();
        //Starting bot and connecting to discord
        logger.debug("Attempting to create a new client instance...");
        const client = new Client({
            intents: [Intents.FLAGS.GUILDS]
        });
        //Dynamically loading commands
        logger.debug("Dynamically loading commands...");
        client.commands = new Collection();
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath);
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            logger.debug("Loaded command file " + file + " from " + filePath);
            client.commands.set(command.data.name, command);
        }
        //Dynamically loading events
        const eventsPath = path.join(__dirname, 'events');
        const evenFiles = fs.readdirSync(eventsPath);
        for (const file of evenFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            logger.debug(`Loading event file: ${file}`);
            if (event.once) {
                client.once(event.name, () => event.execute(client));
            }
            else {
                client.on(event.name, async (interaction) => event.execute(interaction, client));
            }
        }
        //Logging into discord         
        logger.debug("Authenticating your clients token...");
        client.login(this.token);
    }
}
exports.Init = Init;
