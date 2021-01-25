module.exports = async (args, msg, Discord) => {
	let member = msg.member;

	if (
		!(await require('../utils/checkRoles')(member, [
			process.env.PROPOSITION_ROLE_ID,
			process.env.OPPOSITION_ROLE_ID,
		]))
	)
		return msg.reply("You're not part of a team!");
	
	let teamId = null;

	if (
		await require('../utils/checkRoles')(member, [
			process.env.PROPOSITION_ROLE_ID,
		])
	) {
		teamId = process.env.PROPOSITION_ROLE_ID;;
	}

	if (
		await require('../utils/checkRoles')(member, [
			process.env.OPPOSITION_ROLE_ID,
		])
	) {
		teamId = process.env.OPPOSITION_ROLE_ID;
	}

	let role = msg.guild.roles.get(
		teamId
	);

	await member.removeRole(role).catch((err) => {
		return msg.reply(`Sorry, you can't leave the team because: ${err}`);
	});

	return msg.channel.send({
		embed: {
			title: 'Success!',
			description: `${member}, you just left the team!`,
			timestamp: new Date(),
		},
	});
};
