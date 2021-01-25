const moment = require('moment');

const isPreBan = require('../utils/isPreBan');

module.exports = async (member) => {
	if (await isPreBan(member.user.id)) {
		return member.guild.channels
			.get(process.env.WELCOME_CHANNEL_ID)
			.send(`!ban ${member} Pre-ban`);
	}
};
