"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Assets_1 = __importDefault(require("./Assets"));
const log4js = require('log4js');
class Logger {
    std;
    assets;
    constructor() {
        this.assets = new Assets_1.default();
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
        this.std.addContext('Version', this.assets.version);
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
        this.std.info(`Initializing logger...\n\n\n\n
        
..####...##......######..##..##..######..........##...##..##..##...####...######...####...........#####....####...######.
.##..##..##........##....##..##..##..............###.###..##..##..##........##....##..##..........##..##..##..##....##...
.######..##........##....##..##..####............##.#.##..##..##...####.....##....##..............#####...##..##....##...
.##..##..##........##.....####...##..............##...##..##..##......##....##....##..##..........##..##..##..##....##...
.##..##..######..######....##....######..........##...##...####....####...######...####...........#####....####.....##...
.........................................................................................................................

        Alive Music Bot
        Version: ${this.assets.version}
        Release: Alive-Core
        Developer: Dan

        Thank you for using this bot. For more information visit https://github.com/danlikestocode/Alive-Core
        Please make sure you are on the latest version of Alive Music Bot, since you are using Alive-Core auto-updating is not handled!
        Latest releases can be found at: https://github.com/danlikestocode/Alive-Core/releases
        \n\n\n\n\n`);
    }
}
exports.default = Logger;
