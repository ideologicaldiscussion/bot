const getMember = require('../utils/getMember');

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
		await require('./../utils/checkRoles')(msg.mentions.members.first(), [
			process.env.STAFF_ROLE_ID,
			process.env.BOT_ROLE_ID,
		])
	)
		return msg.reply('I cannot punish admins!');

	let reason = args.slice(1).join(' ') || 'No reason cited';

	await member
		.addRole(msg.guild.roles.get(process.env.PUNISHED_ROLE_ID), reason)
		.catch((err) => {
			return msg.reply(
				`Sorry, I couldn\'t correctly authenticate the user to the punishment channel because: ${err}`,
			);
		});

	msg.channel.send({
		embed: {
			title: 'Punishment!',
			description: `${member}, you have been punished by ${msg.member}. If you break the rules again, you will get banned!`,
			fields: [
				{
					name: 'Reason',
					value: reason,
				},
			],
			timestamp: new Date(),
		},
	});

	Discord.channels.get(process.env.LOG_CHANNEL_ID).send({
		embed: {
			title: 'Punishment!',
			description: `${member} has been punished by ${msg.member}.`,
			fields: [
				{
					name: 'Reason',
					value: reason,
				},
			],
			timestamp: new Date(),
		},
	});

	let mmbr = await getMember(member.id, msg.guild.id);

	if (mmbr.lastPunish && Date.now() - mmbr.lastPunish < 60 * 60 * 1000 * 6) {
		Discord.channels.get(process.env.LOG_CHANNEL_ID).send({
			embed: {
				title: 'Ban Suggestion',
				description: `It's been less than 6 hours since ${member} was last punished. Please consider banning them.`,
				timestamp: new Date(),
			},
		});
	}

	try {
		mmbr.lastPunish = Date.now();

		return await mmbr.save();
	} catch (err) {
		return console.log(err);
	}
};
