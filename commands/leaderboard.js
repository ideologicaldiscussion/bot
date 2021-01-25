const Member = require('../models/Member');

module.exports = async (args, msg, Discord) => {
    try {
        const members = await Member.paginate(
            {
                guildId: msg.guild.id,
            },
			{
				sort: { level: 'desc', points: 'desc', memberId: 'asc' },
				page: args.slice(0),
			},
        );

        let fields = [];

        let position = (members.limit * (members.page || 1)) - members.limit;

        members.docs.forEach(async (member) => {
            position++;

            let user = msg.guild.members.get(member.memberId).user;

            fields.push({
				name: `#${position} - ${user.username}`,
				value: `Level ${member.level}`,
			});
        });

        return msg.channel.send({
            embed: {
                title: 'Leaderboard',
                fields: fields,
                timestamp: new Date(),
            },
        });
    } catch (err) {
        return console.log(err);
    }
};
