const isPreBan = require('../utils/isPreBan');

module.exports = async (args, msg, Discord) => {
	if (
		!(await require('../utils/authenticate')(
			[
				process.env.STAFF_ROLE_ID,
				process.env.BOT_ROLE_ID,
			],
			msg,
		))
	) {
		return false;
	}

	let member = args[0];
	if (!member)
		return msg.reply('Please quote a valid user ID to preban');

	let reason = args.slice(1).join(' ') || 'No reason cited';

	if (await isPreBan(member)) {
		return msg.reply('this user is already pre-banned!');
	}

	await isPreBan(member, true);

	const notification = {
		embed: {
			title: 'Pre Banned!',
			description: `${member} has been pre-banned by ${msg.member}!`,
			fields: [
				{
					name: 'Reason',
					value: reason,
				},
			],
			timestamp: new Date(),
		},
	};

	msg.channel.send(notification);

	return Discord.channels.get(process.env.LOG_CHANNEL_ID).send(notification);
};
