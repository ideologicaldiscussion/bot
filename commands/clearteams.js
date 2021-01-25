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

	let proposition = msg.guild.roles.get(process.env.PROPOSITION_ROLE_ID);

	proposition.members.forEach(async (member) => {
		await member.removeRole(proposition).catch((err) => {
			return msg.reply(`${member} could not be removed from the Proposition team because: ${err}`);
		});
	});

	let opposition = msg.guild.roles.get(process.env.OPPOSITION_ROLE_ID);

	opposition.members.forEach(async (member) => {
		await member.removeRole(opposition).catch((err) => {
			return msg.reply(
				`${member} could not be removed from the Opposition team because: ${err}`,
			);
		});
	});

	return msg.channel.send({
		embed: {
			title: 'Success!',
			description: `Both teams have been cleared!`,
			timestamp: new Date(),
		},
	});
};
