module.exports = async (msg, commands, Discord) => {
	if (msg.webhookID) return;

	if (await require('./events/dBump')(msg)) return;

	if (msg.author.bot && msg.author.id != process.env.BOT_ID) return;

	if (await require('./events/censor')(msg)) return;

	if (await require('./events/invite')(msg)) return;

	if (await require('./events/grade')(msg)) return;

	if (await require('./events/fellard')(msg)) return;

	if (await require('./events/franzing')(msg)) return;

	if (await require('./events/horny')(msg)) return;

	if (await require('./events/memes')(msg)) return;

	if (await require('./events/processAutoUnpunishments')(msg)) return;

	if (msg.content.indexOf('!') !== 0) return;

	const args = msg.content
		.slice(1)
		.trim()
		.split(/ +/g);

	const command = args.shift().toLowerCase();

	if (commands.includes(command))
		return require(`./commands/${command}`)(args, msg, Discord);

	return;
};
