module.exports = async (args, msg, Discord) => {
	let members, online, humans, bots = '0';

	try {
		members = await msg.guild.members
			.filter((member) => !member.user.bot)
			.size.toString();

		online = await msg.guild.members
			.filter(
				(member) =>
					member.presence.status === 'away' ||
					member.presence.status === 'dnd' ||
					member.presence.status === 'online',
			)
			.size.toString();
		
		bots = await msg.guild.members
			.filter((member) => member.user.bot)
			.size.toString();
	} catch (err) {
		return console.log(err);
	};

	return msg.channel.send({
		embed: {
			fields: [
				{
					name: 'Members',
					value: members,
					inline: true,
				},
				{
					name: 'Online',
					value: online,
					inline: true,
				},
				{
					name: 'Bots',
					value: bots,
					inline: true,
				},
			],
			timestamp: new Date(),
		},
	});
};
