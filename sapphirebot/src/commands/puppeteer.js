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

    async messageRun(message, args) {
        const browser = await puppeteer.launch({
args: [
'--no-sandbox',
`--remote-debugging-port=${process.env.SERVER_PORT || 443}`,
],
});
        
        const weburl = await args.rest('string')

        const page = await browser.newPage();
        await page.goto(`https://${weburl}`);
        await page.setViewport({
    width: 1920,
    height: 1080
})


        
        const ss = await page.screenshot({type:"png"})

  message.channel.send({
    files: [{
        attachment: ss,
        name: 'test.png'
    }],
    content:`Screenie`,
});

        await browser.close();
    }
}

exports.UserCommand = UserCommand;