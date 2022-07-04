"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require('log4js');
const logger = log4js.getLogger();
class InteractionCreate {
    name;
    constructor() {
        this.name = 'interactionCreate';
    }
    async execute(interaction, client) {
        logger.debug(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
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
    }
}
exports.default = InteractionCreate;
module.exports = new InteractionCreate();
