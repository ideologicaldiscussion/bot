module.exports = async (args, msg, Discord) => {
	if (
		!(await require('../utils/authenticate')(
			[
				process.env.STAFF_ROLE_ID,
				process.env.BOT_ROLE_ID,
			],
			msg,
		))
	) {
		return false;
	};

	const position = args[0];
	const color = args[1];
	const name = args.slice(2).join(' ');

	msg.guild
		.createRole({
			name: name,
			color: color,
			position: position,
		})
		.then((role) => {
							return msg.reply(
								`the role ${name} has been created!`,
							);
						}).catch((err) => {
			return console.log(err);
		});
};
