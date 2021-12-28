import fetch from "node-fetch";

const openInscriptions = async (interaction, content, open) => {
	const action = {
		open,
	};

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(action),
	};

	try {
		const res = await fetch(
			"http://localhost:3024/tournament/inscriptions/status",
			requestOptions
		);

		if (res.status !== 200) {
			throw "Erreur...";
		}

		interaction.reply({
			content,
			fetchReply: true,
		});
	} catch (error) {
		console.error(error);

		interaction.reply({
			content: "Erreur...",
			fetchReply: true,
		});
	}
};

export default { open_inscriptions: openInscriptions };
