//Types for NodeJS
declare namespace NodeJS {
    interface ProcessEnv {
        readonly DISCORD_TOKEN: string
        readonly CLIENT_ID: string
        readonly GUILD_ID: string
    }
}

