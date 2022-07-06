"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
class AddSong {
    name;
    logger;
    constructor() {
        this.name = 'addSong';
        this.logger = new logger_1.default();
    }
    execute(queue, song) {
        queue.textChannel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}.`);
        this.logger.debug('Emitted event ADD SONG');
    }
}
exports.default = AddSong;
module.exports = new AddSong();
