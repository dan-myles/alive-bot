"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDeployCommands = void 0;
const logger_1 = __importDefault(require("./logger"));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
const logger = new logger_1.default();
class LocalDeployCommands {
    token;
    clientId;
    guildId;
    constructor() {
        logger.debug("Reading clientId, guildId and token from .env file...");
        this.token = process.env.DISCORD_TOKEN;
        this.clientId = process.env.CLIENT_ID;
        this.guildId = process.env.GUILD_ID;
        logger.debug("Succesfully read clientId, guildId and token from .env file!");
    }
    //Dynamically registering commands in /commands
    //Important: Currently not filtering for ONLY .ts files
    registerCommands() {
        logger.debug("Instantiating register commands interface...");
        const commands = [];
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath);
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            logger.debug("Registrar pulled command: " + file);
            commands.push(command.data.toJSON());
        }
        const rest = new REST({ version: '9' }).setToken(this.token);
        (async () => {
            try {
                logger.debug("Started registering pulled application commands...");
                await rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), { body: commands });
                logger.debug("Succesfully registered all application commands!");
            }
            catch (error) {
                logger.error(error);
            }
        })();
    }
}
exports.LocalDeployCommands = LocalDeployCommands;
