export {}
import Logger from "../logger";

export default class AddSong {
    name: any;
    logger: any;

    constructor() {
        this.name = 'addSong';
        this.logger = new Logger();
    }


    public execute(queue: any, song: any) {
        queue.textChannel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}.`);
        this.logger.debug('Emitted event ADD SONG');

    }
}

module.exports = new AddSong();