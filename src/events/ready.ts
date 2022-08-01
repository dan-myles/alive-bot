export { }
import Logger from "../Logger";

export default class Ready {
    public name: any;
    public once: any;
    private logger: any;

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
