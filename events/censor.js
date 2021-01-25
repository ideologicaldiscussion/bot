module.exports = async (msg) => {
	if (!msg.author.bot && !process.env.DISABLE_CENSORING) {
		const words = [
			'mongoloid',
			'nigger',
			'tranny',
			'trannys',
			'trannies',
			'nigga',
			'cumskin',
			'nigtard',
			'faggot',
			'kike',
			'femoid',
			'gook',
			'muzzie',
			'kaffir',
			'gypsy',
			'gypsie',
		];

		const BadWords = require('bad-words');
		let filter = new BadWords({ emptyList: true, placeHolder: '#' });
		filter.addWords(...words);

		if (filter.isProfane(msg.content)) {
			msg.channel.createWebhook(`${msg.member.nickname ? msg.member.nickname : msg.author.username } | ᴇᴅɪᴛ ʙʏ `, msg.author.avatarURL).then(webhook => {
				webhook.send(filter.clean(msg.content));
				webhook.delete();
			}).catch(console.error);

			msg.delete();

			return;
		}

		words.some((word) => {
			if (msg.content && msg.content.toLowerCase().replace(/[\W_]+/g, '').includes(word)) {
				msg.delete();

				msg.author.send(
					`The word ${word} is banned from Ideological Discussion. Please DM a staff member if you are confused as to why.`
				);

				return true;
			}
		});
	}
};
