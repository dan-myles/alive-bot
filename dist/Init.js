"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init = void 0;
const localdeploycommands_1 = require("./localdeploycommands");
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv').config();
const log4js = require('log4js');
const fs = require('node:fs');
const path = require('node:path');
const logger = log4js.getLogger();
const registrar = new localdeploycommands_1.LocalDeployCommands();
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
        client.once('ready', () => {
            logger.info("Sucessfully logged into discord!");
        });
        client.on("messageCreate", (message) => {
            // Here's I'm using one of An Idiot's Guide's basic command handlers. Using the PREFIX environment variable above, I can do the same as the bot token below
            if (message.author.bot)
                return;
            if (message.content.indexOf(prefix.length) !== 0)
                return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            if (command === "ping") {
                message.reply("Pong!");
            }
        });
        logger.debug("Authenticating your clients token...");
        client.login(this.token);
    }
}
exports.Init = Init;
