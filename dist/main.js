"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
const Initialize_1 = __importDefault(require("./Initialize"));
const logger = new Logger_1.default();
const core = new Initialize_1.default();
logger.initLog();
core.startApplication();
