const log4js = require('log4js');
// const uuidv1 = require('uuid/v1');

export default class Logger {

    private std: any;
    private sessionID: any;

    constructor() {
        this.sessionID = 3213891231;
        log4js.configure({
            appenders: {
              Alive: { type: 'stdout' },
            },
            categories: {
              default: {
                appenders: ['Alive'],
                level: 'all',
              },
            },
        });

        this.std = log4js.getLogger("Alive");
        this.std.addContext('sessionID', this.sessionID);
    }

    public debug(message: any) {
        this.std.debug(message);
    }

    public info(message: any) {
        this.std.info(message);
    }

    public error(message: any) {
        this.std.error(message);
    }

    public fatal(message: any) {
        this.std.fatal(message);
    }

    public warn(message: any) {
        this.std.warn(message);
    }

    public initLog() {
        this.std.info(`Starting bot with Session ID: ${this.sessionID}}`)
    }

}

