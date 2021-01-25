const getMember = require('../utils/getMember');

module.exports = async (msg) => {
	if (
		msg.channel.id != process.env.MEMES_CHANNEL_ID
	) {
		return;
	}

	if (! msg.attachments.size) {
		msg.delete();
	}

	msg.react('👍');

	let member = await getMember(msg.member.id, msg.guild.id);

	msg.createReactionCollector((reaction, user) => {
		return reaction.emoji.name == '👍' && user.id != msg.author.id;
	}, { time: 86400000 }).on('collect', async (reaction, user) => {
		try {
			member.points += 50;

			member = await member.save();
		} catch (err) {
			return console.log(err);
		}
	});
};
