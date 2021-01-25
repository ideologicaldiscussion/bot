var giphy = require('giphy-api')('nixsNLr4I1BCId4uVhVRP4ys671AjyLF');

module.exports = async (args, msg, Discord) => {
    giphy.search({
        q: 'raccoon',
        limit: 60
    }).then(function (res) {
        msg.channel.send(res.data[Math.floor((Math.random()*res.data.length))].bitly_url);
    });
};