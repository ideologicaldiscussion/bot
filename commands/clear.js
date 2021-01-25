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

	const deleteCount = parseInt(args[0], 10);

	if (!deleteCount || deleteCount < 2 || deleteCount > 100)
		return msg.reply(
			'Please provide a number greater than 2 and less than 100 for the number of messages to delete',
		);

	const fetched = await msg.channel.fetchMessages({
		limit: deleteCount,
	});

	return msg.channel
		.bulkDelete(fetched)
		.catch((err) => {
			return msg.reply(`Couldn't delete messages because of: ${err}`);
		});
};
