const moment = require('moment');

const Member = require('../models/Member');

const checkRoles = require('./../utils/checkRoles');
const getMember = require('../utils/getMember');

module.exports = async (args, msg, Discord) => {
	if (
		!(await require('../utils/checkRoles')(msg.member, [
			process.env.STAFF_ROLE_ID,
			process.env.BOT_ROLE_ID,
		])) &&
		msg.channel.id != process.env.BOT_CHANNEL_ID
	)
		return msg.reply(
			`Please use the \`!whois\` command again in <#${process.env.BOT_CHANNEL_ID}> instead.`,
		);

	let member = msg.mentions.members.first() || msg.member;

	let joinPosition = 0;
	let members = msg.guild.members.array();
	members.sort((a, b) => a.joinedAt - b.joinedAt);

	for (let i = 0; i < members.length; i++) {
		if (members[i].id == member.id) {
			joinPosition = i + 1;
		}
	}

	let type = 'Member';
	if (await checkRoles(member, [process.env['STAFF_ROLE_ID']])) {
		type = 'Admin';
	};

	let highestRank = 1;
	for (let rank = 1; rank < 7; rank++) {
		if (await checkRoles(member, [process.env[`RANK_${rank}_ROLE_ID`]])) {
			highestRank = rank;
		}
	}

	let rank = msg.guild.roles.get(process.env[`RANK_${highestRank}_ROLE_ID`]);

	let levelRank = msg.guild.memberCount;

	try {
		members = await Member.find({
			guildId: msg.guild.id,
		}).sort({ level: 'desc', points: 'desc', memberId: 'asc' });
		for (let m = 0; m < members.length; m++) {
			if (members[m].memberId === member.id) {
				levelRank = m + 1;
			}
		}

		levelRank = levelRank.toString();
	} catch (err) {
		return console.log(err);
	}

	let mmbr;

	try {
		mmbr = await getMember(member.id, msg.guild.id);
	} catch (err) {
		return console.log(err);
	}

	let roles = '';

	member.roles.forEach((role) => {
		roles = roles + `${role} `;
	});

	roles = roles.length > 1024 ? roles.substring(0, 1021).substring(0, roles.lastIndexOf(' ')) + '...' : roles;

	if (mmbr) {
		return msg.channel.send({
			embed: {
				author: {
					name: `${member.user.tag} - ${rank.name} - ${type}`,
					icon_url: member.user.avatarURL,
				},
				title: `Rank #${levelRank} - Level ${(
					mmbr.level || 1
				).toString()} - ${(mmbr.points || 1).toString()}/${(
					(99 + mmbr.level * 10) || 100
				).toString()}`,
				thumbnail: {
					url: member.user.avatarURL,
				},
				fields: [
					{
						name: 'Status',
						value: member.presence.status,
						inline: true,
					},
					{
						name: 'Joined',
						value: moment(member.joinedAt).format('LLLL'),
						inline: true,
					},
					{
						name: 'Join Position',
						value: joinPosition,
						inline: true,
					},
					{
						name: 'Registered',
						value: moment(member.user.createdTimestamp).format(
							'LLLL',
						),
						inline: true,
					},
					{
						name: `Roles (${member.roles.size})`,
						value: roles,
					},
				],
				timestamp: new Date(),
			},
		});
	} else {
		return null;
	}
};
