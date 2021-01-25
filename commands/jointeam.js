module.exports = async (args, msg, Discord) => {
	let member = msg.member;

	if (
		await require('../utils/checkRoles')(member, [
			process.env.PROPOSITION_ROLE_ID,
			process.env.OPPOSITION_ROLE_ID,
		])
	)
		return msg.reply("You're already part of a team!");

	let team = args.slice(0).join('');

	team = team.charAt(0).toUpperCase() + team.slice(1);

	if (team != 'Proposition' && team != 'Opposition') team = null;

	if (!team)
		return msg.reply(
			'Please specify a team, either Propostion or Opposition, that you want to join!'
		);

	let role = msg.guild.roles.get(
		process.env[`${team.toUpperCase()}_ROLE_ID`]
	);

	await member.addRole(role).catch((err) => {
		return msg.reply(`Sorry, you can't join the team because: ${err}`);
	});

	return msg.channel.send({
		embed: {
			title: 'Success!',
			description: `${member}, you just joined the team ${team}. Get ready for the debate!`,
			timestamp: new Date(),
		},
	});
};
