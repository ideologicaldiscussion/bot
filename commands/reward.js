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

	let amount = args[1];
    if (!amount || isNaN(amount))
		return msg.reply(
			'Please provide a valid integer to increase the user\'s level by',
        );

	let mmbr = await getMember(member.id, msg.guild.id);

    let level = (mmbr.level || 1) + parseInt(amount);

	let reason = args.slice(2).join(' ') || 'No reason cited';

	try {
        mmbr.level = level;

		mmbr = await mmbr.save();
	} catch (err) {
		return console.log(err);
	}

	return msg.channel.send({
		embed: {
			title: 'Reward!',
			description: `${member}, you have been rewarded by ${msg.member}. You're now on level ${mmbr.level}. Good job!`,
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
