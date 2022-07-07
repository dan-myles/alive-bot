"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
class Assets {
    logger;
    logoNormal;
    logoBlack;
    logoTransparent;
    logoWhite;
    logoPFP;
    logoPFP2;
    logoPFP3;
    logoPFP4;
    logoPFP5;
    logoPFP6;
    URL;
    name;
    embedColor;
    footerText;
    deleteDurationNormal;
    deleteDurationNP;
    constructor() {
        this.logger = new Logger_1.default();
        this.logoNormal = 'https://i.imgur.com/ZEcs8CV.jpg';
        this.logoBlack = 'https://i.imgur.com/HUf9nGL.png';
        this.logoTransparent = 'https://i.imgur.com/hE1LOHo.png';
        this.logoWhite = 'https://i.imgur.com/UHqY6E2.png';
        this.logoPFP = 'https://i.imgur.com/5x6ld0q.png';
        this.logoPFP2 = 'https://i.imgur.com/3oVnsff.png';
        this.logoPFP3 = 'https://i.imgur.com/sQqgo2E.png';
        this.logoPFP4 = 'https://i.imgur.com/2aWeLhA.png';
        this.logoPFP5 = 'https://i.imgur.com/Yxfloyd.png';
        this.logoPFP6 = 'https://i.imgur.com/PjVxFIa.png';
        this.URL = 'https://github.com/danlikestocode/Alive-Core';
        this.name = 'Alive Music Bot';
        this.embedColor = '#F5756B';
        this.footerText = 'alive music bot | open source | free';
        this.deleteDurationNormal = 15000;
        this.deleteDurationNP = 30000;
        this.logger.debug('Loaded assets!');
    }
}
exports.default = Assets;
