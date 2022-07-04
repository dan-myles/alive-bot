import Ping from "./commands/ping";
import { LocalDeployCommands } from "./handler";
const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv').config();
const log4js = require('log4js');
const fs = require('node:fs');
const path = require ('node:path');

const logger = log4js.getLogger();
const registrar = new LocalDeployCommands();

//Main Class
export class Init {
    private readonly token: string;

    //Reading token from .env file
    constructor() {
        logger.level = "ALL";
        logger.debug("Initializing discord token from .env file...")
        
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



        client.commands = new Collection();
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath);

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);



            logger.info(file)
            logger.info(filePath);


            client.commands.set(command.data.name, command);
        }


       //Dyniamically Executing Commands
        client.on('interactionCreate', async (interaction: { isCommand?: any; reply?: any; commandName?: any; }) => {
            if (!interaction.isCommand()) return;

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction)
            }  catch (error) {
                logger.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                })
            }
        });



        //Logging into discord         
        logger.debug("Authenticating your clients token...");
        client.login(this.token);



    }

    public async importClass(filePath: string) {
        return await import (filePath);
    }

}