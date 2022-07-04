"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require('log4js');
const logger = log4js.getLogger();
class Ready {
    name;
    once;
    constructor() {
        this.name = 'ready';
        this.once = true;
    }
    execute(client) {
        logger.info(`Succesfully launched! Logged in as ${client.user.tag}`);
    }
}
exports.default = Ready;
module.exports = new Ready();
