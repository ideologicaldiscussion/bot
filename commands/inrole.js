module.exports = async (args, msg, Discord) => {
	try {
		let role = msg.guild.roles.get(args.join(' '));

		let members = [];

		role.members.forEach(async (member) => {
			members.push(member.user.username);
		});

		return msg.channel.send({
			embed: {
				title: `${role.name} Members`,
				description:
					members.join('\n') ||
					'No members with this role yet!',
				timestamp: new Date(),
			},
		});
	} catch (err) {
		return console.log(err);
	}
};
