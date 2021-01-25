let Discord = require('discord.js');
Discord = new Discord.Client();

let db = require('./db');

Discord.on('ready', () => {
	console.log('Ready!');
});

Discord.on('guildMemberAdd', async (member) => {
	if (member.guild.id != 649976937237708821) return;

	await require('./events/guildMemberAdd')(member);
});

Discord.on('guildMemberRemove', async (member) => {
	if (member.guild.id != 649976937237708821) return;

	await require('./events/guildMemberRemove')(member);
});

Discord.on('message', async (msg) => {
	if (msg.guild.id != 649976937237708821) return;

	await require('./message')(
		msg,
		[
			'assignroles',
			'aup',
			'ban',
			'bj',
			'clear',
			'clearteams',
			'demote',
			'iam',
			'iamn',
			'inrole',
			'jointeam',
			'leaderboard',
			'leaveteam',
			'lf',
			'membercount',
			'newrole',
			'ok',
			'ping',
			'preban',
			'promote',
			'punish',
			'raccoon',
			'reward',
			'roles',
			'sanction',
			'say',
			'systemrole',
			'teams',
			'unpunish',
			'unusedroles',
			'warn',
			'whois',
		],
		Discord
	);
});

Discord.on('messageUpdate', async (oldMessage, newMessage) => {
	if (oldMessage.guild.id != 649976937237708821) return;

	await require('./events/censor')(newMessage);
});

Discord.login(process.env.TOKEN);
