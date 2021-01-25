const getMember = require('../utils/getMember');

module.exports = async (msg) => {
	if (
		await require('../utils/checkRoles')(msg.member, [
			process.env.STAFF_ROLE_ID,
			process.env.BOT_ROLE_ID,
		])
	)
		return;

	if (
		msg.content.includes('discord.gg/') ||
		msg.content.includes('discordapp.com/invite/')
	) {
		msg.delete();

		msg.channel.send({
			embed: {
				title: 'Warning!',
				description: `${msg.member}, you have been warned for posting an invite. If you break the rules again, you will get punished!`,
				timestamp: new Date(),
			},
		});

		Discord.channels.get(process.env.LOG_CHANNEL_ID).send({
			embed: {
				title: 'Warning!',
				description: `${msg.member} has been warned for posting an invite.`,
				timestamp: new Date(),
			},
		});

		let mmbr = await getMember(msg.member.id, msg.guild.id);

		if (mmbr.lastWarn && Date.now() - mmbr.lastWarn < (60 * 60 * 1000 * 6)) {
			Discord.channels.get(process.env.LOG_CHANNEL_ID).send({
				embed: {
					title: 'Punishment Suggestion',
					description: `It's been less than 6 hours since ${msg.member} was last warned. Please consider punishing them.`,
					timestamp: new Date(),
				},
			});
		};

		try {
			mmbr.lastWarn = Date.now();

			mmbr = await mmbr.save();
		} catch (err) {
			return console.log(err);
		}

		return true;
	}

	return;
};
