module.exports = async (msg) => {
	if (msg.embeds) {
		msg.embeds.forEach(async (embed) => {
			if (embed.description) {
				if (
					embed.description.toLowerCase().includes('bump done')
					&& msg.author.bot
				) {
					let mentions = embed.description.match(/<@!?\d{17,19}>/g);

					msg.channel.send(
						`Thanks for the bump, ${
							mentions[0]
						}! :smile:`,
					);

					return msg.channel.send(
						`!reward ${
						mentions[0]
						} 1 Successful \`!d bump\``
					);
				};

				if (
					embed.description
						.toLowerCase()
						.includes('until the server can be bumped') &&
					msg.author.bot
				) {
					let mentions = embed.description.match(/<@!?\d{17,19}>/g);

					return msg.channel.send(`Nice try, ${mentions[0]}! :wink:`);
				};
			};
		});
	};
};
