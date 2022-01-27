const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');
const Discord = require("discord.js");
const fetch = require('node-fetch');
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'puppeteer]',
            aliases: ['ppt'],
            description: 'Screenshot a Website'
        });
    }

    async messageRun(message) {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto('https://google.com');

        console.log(await page.content());
        await page.screenshot({
            path: 'screenshot.png'
        });

        await browser.close();

        message.channel.send(`${screenshot} je`)
    }
}

exports.UserCommand = UserCommand;