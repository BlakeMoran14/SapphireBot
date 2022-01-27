const {
    Command
} = require('@sapphire/framework');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            aliases: ['sh'],
            description: 'Executes JavaScript Code',
            quotes: [],
            preconditions: ['OwnerOnly'],
            options: ['depth']
        });
    }

    async messageRun(message, args) {

        const util = require('util');
        const exec = util.promisify(require('child_process').exec);

        const {
            stdout,
            stderr
        } = await exec(await args.rest('string'))
        message.channel.send(`Ran: ${message.content}\n\`\`\`${stdout}\`\`\``, {
            split: true
        }).catch(console.stderr);
    }
}

exports.UserCommand = UserCommand;