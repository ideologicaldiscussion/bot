const isSystemRole = require('../utils/isSystemRole');

module.exports = async (args, msg, Discord) => {
    let roles = [];

    for (role of msg.guild.roles) {
        systemRole = await isSystemRole(role[1].id);

        if (!systemRole && role[1].name != 'new role') {
            roles.push(role[1].name);
        }
    };

    Object.defineProperty(Array.prototype, 'chunk', {
        configurable: true,
        value: function (chunkSize) {
            var R = [];
            for (var i = 0; i < this.length; i += chunkSize)
                R.push(this.slice(i, i + chunkSize));
            return R;
        },
    });

    const pages = roles.sort().chunk(30);
    let page = args[0] || 1;

    msg.channel
        .send({
            embed: {
                title: 'Roles',
                description: pages[page - 1].join('\n'),
                footer: {
                    text: `Page ${page} of ${pages.length}`,
                },
            },
        });
};
