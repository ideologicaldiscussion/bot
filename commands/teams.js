module.exports = async (args, msg, Discord) => {
	try {
		let proposition = msg.guild.roles.get(process.env.PROPOSITION_ROLE_ID);

		let propositionMembers = [];

		proposition.members.forEach(async (member) => {
			propositionMembers.push(member.user.username);
		});

		msg.channel.send({
			embed: {
				title: 'Proposition Team',
				description:
					propositionMembers.join('\n') ||
					'No members in this team yet!',
				timestamp: new Date(),
			},
		});

		let opposition = msg.guild.roles.get(process.env.OPPOSITION_ROLE_ID);

		let oppositionMembers = [];

		opposition.members.forEach(async (member) => {
			oppositionMembers.push(member.user.username);
		});

		return msg.channel.send({
			embed: {
				title: 'Opposition Team',
				description:
					oppositionMembers.join('\n') ||
					'No members in this team yet!',
				timestamp: new Date(),
			},
		});
	} catch (err) {
		return console.log(err);
	}
};
