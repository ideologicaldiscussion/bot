const PreBan = require('../models/PreBan');

module.exports = async (userId, create = false) => {
    let ban;

    try {
        ban = await PreBan.findOne({
			userId: userId,
		}).exec();

        if (!ban) {
			if (create) {
				ban = new PreBan({
					userId: userId,
				});

                ban = await ban.save();

				return true;
			} else {
				return false;
			}
		};

        return true;
    } catch (err) {
        return console.log(err);
    }
};
