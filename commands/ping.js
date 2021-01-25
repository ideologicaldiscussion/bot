module.exports = async (args, msg, Discord) => {
	if (
		!(await require('./../utils/authenticate')(
			[
				process.env.STAFF_ROLE_ID,
				process.env.BOT_ROLE_ID,
			],
			msg,
		))
	) {
		return false;
	}

	const res = await msg.channel.send('Ping?');

	return res.edit(
		`Pong! Latency is ${res.createdTimestamp -
			msg.createdTimestamp}ms. API Latency is ${Math.round(
			Discord.ping,
		)}ms.`,
	);
};
