module.exports = async (roles, msg) => {
	if (! (await require('./checkRoles')(msg.member, roles))) {
		msg.reply('You don\'t have permission to use this.');

		return false;
	}

	return true;
};
