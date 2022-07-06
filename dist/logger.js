"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require('log4js');
const uuidv1 = require('uuid/v1');
class Logger {
    std;
    sessionID;
    constructor() {
        this.sessionID = uuidv1();
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
    debug(message) {
        this.std.debug(message);
    }
    info(message) {
        this.std.info(message);
    }
    error(message) {
        this.std.error(message);
    }
    fatal(message) {
        this.std.fatal(message);
    }
    warn(message) {
        this.std.warn(message);
    }
    initLog() {
        this.std.info(`Starting bot with Session ID: ${this.sessionID}}`);
    }
}
exports.default = Logger;
