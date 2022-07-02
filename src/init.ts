const dotenv = require('dotenv').config();
const { Client, Intents } = require('discord.js');
const log4js = require('log4js');

class init {
    token: string;

    constructor() {
        this.token = process.env.DISCORD_TOKEN;
    }



}