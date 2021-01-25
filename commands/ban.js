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

	let member = msg.mentions.members.first();
	if (!member || member.id == msg.member.id)
		return msg.reply('Please mention a valid member of this server');
	if (
		await require('../utils/checkRoles')(msg.mentions.members.first(), [
			process.env.STAFF_ROLE_ID,
			process.env.BOT_ROLE_ID,
		])
	) {
		return msg.reply('I cannot ban admins!');
	};

	let reason = args.slice(1).join(' ') || 'No reason cited';

	await member
		.ban(reason)
		.catch((err) => {
			return msg.reply(`Sorry, I couldn\'t ban because: ${err}`);
		});

	const notification = {
		embed: {
			title: 'Banned!',
			description: `${member} has been banned by ${msg.member}!`,
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
