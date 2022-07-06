"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
class Ready {
    name;
    once;
    logger;
    constructor() {
        this.name = 'ready';
        this.once = true;
        this.logger = new logger_1.default();
    }
    execute(client) {
        this.logger.info(`Succesfully launched! Logged in as ${client.user.tag}`);
    }
}
exports.default = Ready;
module.exports = new Ready();
