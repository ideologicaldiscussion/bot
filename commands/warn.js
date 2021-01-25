const getMember = require('../utils/getMember');

module.exports = async (args, msg, Discord) => {
	if (
		!(await require('./../utils/authenticate')(
			[process.env.STAFF_ROLE_ID, process.env.BOT_ROLE_ID],
			msg
		))
	) {
		return false;
	}

	let member = msg.mentions.members.first();
	if (!member || member.id == msg.member.id)
		return msg.reply('Please mention a valid member of this server');
	if (
		(await require('./../utils/checkRoles')(msg.mentions.members.first(), [
			process.env.STAFF_ROLE_ID,
			process.env.BOT_ROLE_ID,
		])) &&
		!msg.author.bot
	)
		return msg.reply('I cannot warn admins!');

	let reason = args.slice(1).join(' ') || 'No reason cited';

	msg.channel.send({
		embed: {
			title: 'Warning!',
			description: `${member}, you have been warned by ${msg.member}. If you break the rules again, you will get punished!`,
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
			title: 'Warning!',
			description: `${member} has been warned by ${msg.member}.`,
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

	if (mmbr.lastWarn && Date.now() - mmbr.lastWarn < 60 * 60 * 1000 * 6) {
		Discord.channels.get(process.env.LOG_CHANNEL_ID).send({
			embed: {
				title: 'Punishment Suggestion',
				description: `It's been less than 6 hours since ${member} was last warned. Please consider punishing them.`,
				timestamp: new Date(),
			},
		});
	}

	try {
		mmbr.lastWarn = Date.now();

		return await mmbr.save();
	} catch (err) {
		return console.log(err);
	}
};
