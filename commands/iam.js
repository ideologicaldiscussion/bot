const isSystemRole = require('../utils/isSystemRole');

module.exports = async (args, msg, Discord) => {
    let roleName = args.slice(0).join(' ');

    let role = msg.guild.roles.find((role) => role.name.toLowerCase() === roleName.toLowerCase());

    if (!role) {
        return msg.reply("I couldn't find that role!");
    };

    if (await isSystemRole(role.id)) {
		return msg.reply('that role is not self-assignable!');
	}

	await msg.member.addRole(role).catch((err) => {
		return msg.reply(
			`I couldn\'t give you that role because: ${err}`,
		);
	});

	return msg.reply(`you've now got the ${role.name} role.`);
};;
