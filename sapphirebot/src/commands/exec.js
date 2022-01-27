const {
    Command
} = require('@sapphire/framework');
const {
    send
} = require('@sapphire/plugin-editable-commands');
const {
    Type
} = require('@sapphire/type');
const {
    codeBlock,
    isThenable
} = require('@sapphire/utilities');
const {
    inspect
} = require('util');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            aliases: ['sh'],
            description: 'Executes JavaScript Code',
            quotes: [],
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