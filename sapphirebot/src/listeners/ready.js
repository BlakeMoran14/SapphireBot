const { Listener } = require('@sapphire/framework');
const { blue, gray, green, magenta, magentaBright, white, yellow } = require('colorette');
var DanBotHosting = require("danbot-hosting");

const dev = process.env.NODE_ENV !== 'production';

class UserEvent extends Listener {
	style = dev ? yellow : blue;

	constructor(context, options = {}) {
		super(context, {
			...options,
			once: true
		});
	}

	run() {
		this.printBanner();
		this.printStoreDebugInformation();
        this.dbhAPILoader();
	}
    
    async dbhAPILoader() {
        const { client } = this.container;
        
const API = new DanBotHosting.Client("danbot-5xsvjeiH0YUBDVODvO$8FOundefinedKY16NW$KkXh%2Asvf", client);
 
  // Start posting
  let initalPost = await API.autopost();
        
        let res = await API.botInfo()
 console.log(res)
}

	printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop();

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	styleStore(store, last) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}

exports.UserEvent = UserEvent;
