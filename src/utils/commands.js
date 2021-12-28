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

const generate_pools_string = (data) => {
	const { pool_list } = data.tournament;

	const plist = pool_list.map((pool) => {
		const player_list = pool.player_list.map((player) => player.league_name);

		const list = player_list.join("\n");

		return list;
	});

	const final_string = plist.join("\n\n");

	return final_string;
};

export { openInscriptions, generate_pools_string };
