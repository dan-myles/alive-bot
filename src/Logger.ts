import Assets from "./Assets";
const log4js = require('log4js');

export default class Logger {

    private std: any;
    private assets: any;

    constructor() {
        this.assets = new Assets();
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

