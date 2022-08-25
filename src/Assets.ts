export {};

export default class Assets {
  public readonly logger: any;
  public readonly logoNormal: string;
  public readonly logoBlack: string;
  public readonly logoTransparent: string;
  public readonly logoWhite: string;
  public readonly logoPFP: string;
  public readonly logoPFP2: string;
  public readonly logoPFP3: string;
  public readonly logoPFP4: string;
  public readonly logoPFP5: string;
  public readonly logoPFP6: string;
  public readonly URL: string;
  public readonly name: string;
  public readonly embedColor: string;
  public readonly embedErrorColor: string;
  public readonly embedSuccessColor: string;
  public readonly footerText: string;
  public readonly deleteDurationNormal: number;
  public readonly deleteDurationNP: number;
  public readonly errorEmoji: string;
  public readonly successEmoji: string;
  public readonly discordInvite: string;
  public readonly version: string;

  constructor() {
    this.logoNormal = "https://i.imgur.com/ZEcs8CV.jpg";
    this.logoBlack = "https://i.imgur.com/HUf9nGL.png";
    this.logoTransparent = "https://i.imgur.com/hE1LOHo.png";
    this.logoWhite = "https://i.imgur.com/UHqY6E2.png";
    this.logoPFP = "https://i.imgur.com/5x6ld0q.png";
    this.logoPFP2 = "https://i.imgur.com/3oVnsff.png";
    this.logoPFP3 = "https://i.imgur.com/sQqgo2E.png";
    this.logoPFP4 = "https://i.imgur.com/2aWeLhA.png";
    this.logoPFP5 = "https://i.imgur.com/Yxfloyd.png";
    this.logoPFP6 = "https://i.imgur.com/PjVxFIa.png";
    this.URL = "https://github.com/danlikestocode/Alive-Core";
    this.name = "Alive Music Bot";
    this.embedColor = "#F5756B";
    this.embedErrorColor = "#ff0000";
    this.embedSuccessColor = "#00ff00";
    this.footerText = "alive music bot | open source | free";
    this.deleteDurationNormal = 15000;
    this.deleteDurationNP = 30000;
    this.errorEmoji = ":x:";
    this.successEmoji = ":white_check_mark:";
    this.discordInvite = "https://apeswon.club";
    this.version = "v2.0.1";
  }
}
