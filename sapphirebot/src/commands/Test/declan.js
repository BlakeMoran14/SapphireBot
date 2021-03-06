const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options,
            preconditions: ['OwnerOnly']
        });
    }

    async messageRun(message) {
        return message.channel.send('Hello world!');
    }
}

exports.UserCommand = UserCommand;
