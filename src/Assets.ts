export {}
import Logger from "./Logger"


export default class Assets {
    public readonly logger: any;
    public readonly logoNormal: any;
    public readonly logoBlack: any;
    public readonly logoTransparent: any;
    public readonly logoWhite: any;
    public readonly logoPFP: any;
    public readonly logoPFP2: any;
    public readonly logoPFP3: any;
    public readonly logoPFP4: any;
    public readonly logoPFP5: any;
    public readonly logoPFP6: any;
    public readonly URL: any;
    public readonly name: any;
    public readonly embedColor: any;
    public readonly embedErrorColor: any;
    public readonly embedSuccessColor: any;
    public readonly footerText: any;
    public readonly deleteDurationNormal: any;
    public readonly deleteDurationNP: any;
    public readonly errorEmoji: any;
    public readonly successEmoji: any;
    public readonly discordInvite: any;


    constructor() {
        this.logger = new Logger();
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
        this.embedErrorColor = '#ff0000';
        this.embedSuccessColor = '#00ff00';
        this.footerText = 'alive music bot | open source | free';
        this.deleteDurationNormal = 15000;
        this.deleteDurationNP = 30000;
        this.errorEmoji = ':x:';
        this.successEmoji = ':white_check_mark:';
        this.discordInvite = 'https://apeswon.club';
    }
}