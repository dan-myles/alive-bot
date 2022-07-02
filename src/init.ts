import { LocalDeployCommands } from "./localdeploycommands";
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv').config();
const log4js = require('log4js');

const logger = log4js.getLogger();
const registrar = new LocalDeployCommands();

//Main Class
export class Init {
    private readonly token: string;

    //Reading token from .env file
    constructor() {
        logger.level = "ALL";
        logger.debug("Reading discord token from .env file...")
        
        this.token = process.env.DISCORD_TOKEN;
        logger.debug("Constructed initialize class and read discord bot token.")
    }

    //MAIN START FUNCTION
    public startApplication() {
        //Registering slash commands
        registrar.registerCommands();
        

        //Starting bot and connecting to discord
        logger.debug("Attempting to create a new client instance...")
        const client = new Client({
            intents: [Intents.FLAGS.GUILDS]
        });

        client.once('ready', () => {
            logger.info("Sucessfully logged into discord!")
        })

        logger.debug("Authenticating your clients token...");

        client.on('interactionCreate', async (interaction: { 
            isCommand?: any; 
            reply?: any; 
            commandName?: any; 
            }) => {
            if (!interaction.isCommand()) return;
        
            const { commandName } = interaction;
        
            if (commandName === 'ping') {
                await interaction.reply('Pong!');
            } else if (commandName === 'server') {
                await interaction.reply('Server info.');
            } else if (commandName === 'user') {
                await interaction.reply('User info.');
            }
        });

        client.login(this.token);



    }

}