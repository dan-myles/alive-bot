"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
class Ready {
    name;
    once;
    logger;
    constructor() {
        this.name = 'ready';
        this.once = true;
        this.logger = new Logger_1.default();
    }
    execute(client) {
        this.logger.info(`Succesfully launched! Logged in as ${client.user.tag}`);
    }
}
exports.default = Ready;
module.exports = new Ready();
