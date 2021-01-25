const AutoUnpunishment = require('../models/AutoUnpunishment');
const parse = require('parse-duration');

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
	if (!member)
		return msg.reply('Please mention a valid member of this server');

    await AutoUnpunishment.deleteMany({
        memberId: member.id
    });

	let duration = args.slice(1).join(' ');
    if (!duration || !parse(duration))
		return msg.reply(
			`Auto unpunishment cleared for ${member}.`,
        );

    const unpunishAt = Date.now() + parse(duration);

	unpunishment = new AutoUnpunishment({
        memberId: member.id,
        unpunishAt: new Date(unpunishAt),
    });

    unpunishment = await unpunishment.save();

	msg.channel.send({
		embed: {
			title: 'Automatic Punishment Reversal Set Up!',
			description: `${member}, you will be unpunished in ${duration} by ${msg.member}.`,
			timestamp: new Date(),
		},
	});
};
