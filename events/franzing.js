module.exports = async (msg) => {
	if (
		msg.content.toLowerCase().includes('franzing')
	) {
		msg.channel.send({
			embed: {
				title: "Franzing (verb)",
				description: `Catastrophic narcissism and gross over-estimation of your own decision making leading to being a schizophrenic control freak until everything blows up in your face.`,
			},
		});
	}
};
