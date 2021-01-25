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

	let member = msg.mentions.members.first();
	if (!member || member.id == msg.member.id)
		return msg.reply('Please mention a valid member of this server');
	if (
		await require('../utils/checkRoles')(msg.mentions.members.first(), [
			process.env.STAFF_ROLE_ID,
			process.env.BOT_ROLE_ID,
		])
	)
		return msg.reply('I cannot unpunish admins!');

	let reason = args.slice(1).join(' ') || 'No reason cited';

	await member
		.removeRole(msg.guild.roles.get(process.env.PUNISHED_ROLE_ID), reason)
		.catch((err) => {
			return msg.reply(
				`Sorry, I couldn\'t correctly remove the user from the punishment channel because: ${err}`,
			);
		});

	msg.channel.send({
		embed: {
			title: 'Punishment Reversal!',
			description: `${member}, you have been unpunished by ${msg.member}. If you break the rules again, you will be punished again!`,
			fields: [
				{
					name: 'Reason',
					value: reason,
				},
			],
			timestamp: new Date(),
		},
	});

	return Discord.channels.get(process.env.LOG_CHANNEL_ID).send({
		embed: {
			title: 'Punishment Reversal!',
			description: `${member} has been unpunished by ${msg.member}.`,
			fields: [
				{
					name: 'Reason',
					value: reason,
				},
			],
			timestamp: new Date(),
		},
	});
};
