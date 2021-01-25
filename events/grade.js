const getMember = require('../utils/getMember');

module.exports = async (msg) => {
    if (!msg.author.bot) {
        let member = await getMember(msg.member.id, msg.guild.id);

        let level = member.level || 1;
        let points = member.points || 0;

        if (points >= (99 + (member.level * 10))) {
            points = 0;
            level++;

            try {
                member.level = level;
                member.points = points;

                member = await member.save();
            } catch (err) {
                return console.log(err);
            }

            msg.reply(`Congratulations! You're now on level ${ level }!`);

            let ranks = [];
            let currentRank = 1;
            let newRank;

            for (rank = 1; rank < 7; rank++) {
                if (await require('./../utils/checkRoles')(msg.member, [process.env[`RANK_${rank}_ROLE_ID`]])) {
                    ranks.push(rank);
                    currentRank = rank;
                }
            }

            if (ranks.length > 1) {
                let ranksToClean = ranks;

                ranksToClean.splice(ranksToClean.indexOf(currentRank), 1);

                ranksToClean.forEach(async (rank) => {
                    await msg.member
						.removeRole(
							msg.guild.roles.get(
								process.env[`RANK_${rank}_ROLE_ID`],
							),
							'Rank cleanups.',
						)
						.catch((err) =>
							msg.channel.send(
								`Sorry, I couldn\'t clean the ranks on ${member} because: ${err}`,
							),
						);
                });
            }

            if (currentRank < 6) {
	    	if (level >= 5 && currentRank <= 1) {
                    newRank = 2;
                } else if (level >= 20 && currentRank <= 2) {
                    newRank = 3;
                } else if (level >= 40 && currentRank <= 3) {
                    newRank = 4;
                } else if (level >= 80 && currentRank <= 4) {
                    newRank = 5;
                } else if (level >= 120 && currentRank <= 5) {
                    newRank = 6;
                }

                if (newRank && newRank != currentRank) {
                    newRank = msg.guild.roles.get(process.env[`RANK_${newRank}_ROLE_ID`]);

                    await msg.member
                        .removeRole(
                            msg.guild.roles.get(
                                process.env[`RANK_${currentRank}_ROLE_ID`],
                            ),
                            'Rank promotion.',
                        )
                        .catch((err) =>
                            msg.channel.send(
                                `Sorry, I couldn\'t remove ${member}'s old rank because: ${err}`,
                            ),
                        );

                    await msg.member
                        .addRole(newRank, 'Rank promotion.')
                        .catch((err) =>
                            msg.channel.send(
                                `Sorry, I couldn\'t promote ${member} because: ${err}`,
                            ),
                        );

                    msg.channel.send({
                        embed: {
                            title: 'Promotion!',
                            description: `${msg.member}, you have been awarded with ${newRank.name}. Good job!`,
                            fields: [
                                {
                                    name: 'Reason',
                                    value: `You reached level ${level}.`,
                                },
                            ],
                            timestamp: new Date(),
                        },
                    });
                };
            }
		} else {
            points++;

            try {
                member.level = level;
                member.points = points;

                member = await member.save();
            } catch (err) {
                return console.log(err);
            }
        }
	}
};
