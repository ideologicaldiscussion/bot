const SystemRole = require('../models/SystemRole');

module.exports = async (roleId, create = false) => {
    if (roleId == process.env.STAFF_ROLE_ID ||
        roleId == process.env.BOT_ROLE_ID ||
        roleId == process.env.OPPOSITION_ROLE_ID ||
        roleId == process.env.PENDING_ROLE_ID ||
        roleId == process.env.PROPOSITION_ROLE_ID ||
        roleId == process.env.RANK_1_ROLE_ID ||
        roleId == process.env.RANK_2_ROLE_ID ||
        roleId == process.env.RANK_3_ROLE_ID ||
        roleId == process.env.RANK_4_ROLE_ID ||
        roleId == process.env.RANK_5_ROLE_ID ||
        roleId == process.env.RANK_6_ROLE_ID ||
        roleId == process.env.PUNISHED_ROLE_ID) {
        return true;
    }

    let role;

    try {
        role = await SystemRole.findOne({
            roleId: roleId,
        }).exec();

        if (!role) {
            if (create) {
                role = new SystemRole({
                    roleId: roleId,
				});

                role = await role.save();

                return true;
            } else {
                return false;
            };
        };

        return true;
    } catch (err) {
        return console.log(err);
    }
};
