const Member = require('../models/Member');

module.exports = async (memberId, guildId) => {
	let member;

	try {
		member = await Member.findOne({
			memberId: memberId,
			guildId: guildId,
		}).exec();

		if (!member) {
			member = new Member({
				memberId: memberId,
				guildId: guildId,
				level: 1,
				points: 0,
			});

			member = await member.save();
		}

		return member;
	} catch (err) {
		return console.log(err);
	}
};
