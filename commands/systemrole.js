const isSystemRole = require('../utils/isSystemRole');

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
	};

	let roleName = args.slice(0).join(' ');

	let role = msg.guild.roles.find((role) => role.name.toLowerCase() === roleName.toLowerCase());

	if (!role) {
		return msg.reply("I couldn't find that role!");
	};

	if (await isSystemRole(role.id)) {
		return msg.reply('this is already a system role!');
	};

	await isSystemRole(role.id, true);

	return msg.reply(`${role.name} is now a system role!`);
};;
