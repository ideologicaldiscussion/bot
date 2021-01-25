const isSystemRole = require('../utils/isSystemRole');

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
    }

    try {
        msg.guild.roles.forEach(async (role) => {
            let systemRole = await isSystemRole(role.id);

            if (role.members.size < 4 && !systemRole) {
                msg.channel.send(`${role.name} - ${role.members.size}`);
            };
        });
    } catch (err) {
        return console.log(err);
    }
};