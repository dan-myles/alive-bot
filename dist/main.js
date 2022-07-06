"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const init_1 = require("./init");
const logger = new logger_1.default();
const core = new init_1.Init();
logger.initLog();
core.startApplication();
