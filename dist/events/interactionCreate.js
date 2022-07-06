"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
class InteractionCreate {
    name;
    logger;
    constructor() {
        this.name = 'interactionCreate';
        this.logger = new logger_1.default();
    }
    async execute(interaction, client) {
        this.logger.debug(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        if (!interaction.isCommand())
            return;
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            await command.execute(interaction, client);
        }
        catch (error) {
            this.logger.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
}
exports.default = InteractionCreate;
module.exports = new InteractionCreate();
