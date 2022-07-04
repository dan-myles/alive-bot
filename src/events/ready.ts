export {}
const log4js = require('log4js');

const logger = log4js.getLogger();

export default class Ready {
    name: any;
    once: any;

    constructor() {
        this.name = 'ready';
        this.once = true;
    }


    public execute(client: any) {
        logger.info(`Succesfully launched! Logged in as ${client.user.tag}`);
    }
}

module.exports = new Ready();