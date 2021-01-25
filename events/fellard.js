module.exports = async (msg) => {
	if (
		msg.content.toLowerCase().includes('fellard') ||
		msg.content.toLowerCase().includes("fellar'd")
	) {
		msg.channel.send({
			embed: {
				title: "Fellar'd (verb)",
				description: `Acting one way in private and another in front of other people while trying to maintain the illusion that you're not full of shit.`,
			},
		});
	}
};
