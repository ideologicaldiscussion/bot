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

	const sayMessage = args.join(' ');
	msg.delete().catch((O_o) => {});
	return msg.channel.send(sayMessage);
};
