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

	let reason = args.slice(1).join(' ') || 'No reason cited';

	const checkRoles = require('../utils/checkRoles');

	let ranks = [];
	let currentRank = 1;
	let newRank;

	for (rank = 1; rank < 7; rank++) {
		if (await checkRoles(member, [process.env[`RANK_${ rank }_ROLE_ID`]])) {
			ranks.push(rank);
			currentRank = rank;
		}
	}

	if (ranks.length > 1) {
		let ranksToClean = ranks;

		ranksToClean.splice(ranksToClean.indexOf(currentRank), 1);

		ranksToClean.forEach(async (rank) => {
			await member
				.removeRole(
					msg.guild.roles.get(process.env[`RANK_${rank}_ROLE_ID`]),
					'Rank cleanups.',
				)
				.catch((err) => {
					return msg.reply(
						`Sorry, I couldn\'t clean the ranks on this user because: ${err}`,
					);
				});
		});
	}

	if (currentRank) {
		if (currentRank === 6) {
			return msg.channel.send({
				embed: {
					title: 'No Changes Required!',
					description: `${member} is already a ${
						msg.guild.roles.get(process.env.RANK_6_ROLE_ID).name
						} so no changes have been made, ${msg.member}.`,
					timestamp: new Date(),
				},
			});
		} else {
			newRank = currentRank + 1;
			newRank = msg.guild.roles.get(process.env[`RANK_${newRank}_ROLE_ID`]);

			await member
				.removeRole(
					msg.guild.roles.get(process.env[`RANK_${currentRank}_ROLE_ID`]),
					'Rank promotion.',
				)
				.catch((err) => {
					return msg.reply(
						`Sorry, I couldn\'t remove the member's old rank because: ${err}`,
					);
				});

			await member
				.addRole(newRank, 'Rank promotion.')
				.catch((err) => {
					return msg.reply(
						`Sorry, I couldn\'t promote the member because: ${err}`,
					);
				});

			return msg.channel.send({
				embed: {
					title: 'Promotion!',
					description: `${member}, you have been awarded with ${newRank.name} by ${msg.member}. Good job!`,
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
	};
};
