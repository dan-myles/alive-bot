export {}
import Logger from "../logger";

export default class Ready {
    name: any;
    once: any;
    logger: any;

    constructor() {
        this.name = 'ready';
        this.once = true;
        this.logger = new Logger();
    }


    public execute(client: any) {
        this.logger.info(`Succesfully launched! Logged in as ${client.user.tag}`);
    }
}

module.exports = new Ready();