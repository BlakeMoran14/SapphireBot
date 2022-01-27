const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');
const { MessageEmbed } = require('discord.js')

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message) {
        return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setTitle('dylan')
                .setDescription("dylan hates gay people")
            ]
        });
    }
}

exports.UserCommand = UserCommand;
