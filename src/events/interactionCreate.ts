export {}
const log4js = require('log4js');

const logger = log4js.getLogger();


export default class InteractionCreate {
    name: any;

    constructor() {
        this.name = 'interactionCreate';
    }

    async execute(interaction: any, client: any) {
        logger.debug(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
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
    }
}

module.exports = new InteractionCreate();