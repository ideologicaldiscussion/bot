const AutoUnpunishment = require('../models/AutoUnpunishment');

module.exports = async (msg) => {
    const unpunishments = await AutoUnpunishment.find({
        unpunishAt: { '$lte': Date.now() }
    }).exec();

    unpunishments.forEach(async unpunishment => {
        const member = msg.guild.members.get(unpunishment.memberId);

        await member
            .removeRole(msg.guild.roles.get(process.env.PUNISHED_ROLE_ID));
    });

    await AutoUnpunishment.deleteMany({
        unpunishAt: { '$lte': Date.now() }
    });
};