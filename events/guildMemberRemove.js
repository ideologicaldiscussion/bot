const getMember = require('../utils/getMember');

module.exports = async (member) => {
	member.guild.channels.cache.get(process.env.LOG_CHANNEL_ID).send({
		embed: {
			title: `A Member Left!`,
			description: `${member} just left the server.`,
			timestamp: new Date(),
		},
	});

	let mmbr = await getMember(member.id, member.guild.id);

	if (mmbr) {
		try {
			mmbr.level = 0;
			mmbr.points = 0;

			mmbr = await mmbr.save();
		} catch (err) {
			return console.log(err);
		}
	}
};
