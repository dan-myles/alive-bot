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
        logger.debug("Constructed initialize class and read discord bot token.");
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
        const commandfiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
        for (const file of commandfiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
        }
        client.once('ready', () => {
            logger.info("Sucessfully logged into discord!");
        });
        //Dynamically executing commands
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand())
                return;
            const command = client.commands.get(interaction.commandName);
            if (!command)
                return;
            try {
                await command.execute(interaction);
            }
            catch (error) {
                logger.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            }
        });
        //Logging into discord         
        logger.debug("Authenticating your clients token...");
        client.login(this.token);
    }
}
exports.Init = Init;
