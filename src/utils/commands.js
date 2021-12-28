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

	if (final_string.lenght() === 0) {
		return "Aucun joueurs inscrits pour générer les pools";
	}

	return final_string;
};

const resolvePlayerList = (data) => {
	if (!data.player_list) {
		return { max_amount: 0, current_amount: 0 };
	} else {
		return data.player_list;
	}
};

const get_infos = async () => {
	const res = await fetch("http://localhost:3024/info");
	const body = await res.json();

	const { data } = body;

	const player_list = resolvePlayerList(data);

	const content = `Pools randoms générées: ${
		data.tournament ? "Oui" : "Non"
	}\nNom du tournoi: ${data.tournament_name}\nInscriptions ouvertes: ${
		data.open ? "Oui" : "Non"
	}\nCapacité du tournoi: ${player_list.max_amount}\nJoueurs inscrits: ${
		player_list.current_amount
	}`;

	return content;
};

export {
	openInscriptions,
	generate_pools_string,
	resolvePlayerList,
	get_infos,
};
