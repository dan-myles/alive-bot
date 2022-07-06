export {}
import Logger from "../logger";


export default class InteractionCreate {
    name: any;
    logger: any;

    constructor() {
        this.name = 'interactionCreate';
        this.logger = new Logger();
    }

    async execute(interaction: any, client: any) {
        this.logger.debug(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client)
        }  catch (error) {
            this.logger.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            })
        }
    }
}

module.exports = new InteractionCreate();