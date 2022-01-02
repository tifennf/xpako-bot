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
		const player_list = pool.player_list.map(
			(player) =>
				`League name: ${player.league_name} ||| Discord name: ${player.discord_name.name}#${player.discord_name.tag}\n`
		);

		const list = player_list.join("\n");

		return list;
	});

	const temp_fmt_list = plist.join(
		"\n---------------------------------------------\n"
	);

	const len = temp_fmt_list.length;

	if (len === 0) {
		return "Aucun joueurs inscrits pour générer les pools";
	}

	const fmt_list =
		"Liste des pools générées\n============================================================\nLeague name | Discord name\n============================================================\n" +
		"```\n" +
		temp_fmt_list +
		"\n```";

	return fmt_list;
};
const generate_plist_string = (data) => {
	const { list } = data.player_list;

	const fmt_list = list.map((player) => {
		const p = `${player.league_name} ||| ${player.discord_name.name}#${player.discord_name.tag}\n`;

		return p;
	});

	// const temp_fmt_list = plist.join(
	// 	"\n---------------------------------------------\n"
	// );

	const len = fmt_list.length;

	if (len === 0) {
		return "Aucun joueurs inscrits pour générer les pools";
	}

	const final_fmt_list =
		"Liste des joueurs inscrits\n============================================================\nLeague name ||| Discord name\n============================================================\n" +
		"```\n" +
		fmt_list +
		"\n```";

	return final_fmt_list;
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

	return data;
};

const stringify_infos = (data, option) => {
	const player_list = resolvePlayerList(data);

	const is_pools_generated = data.tournament;
	const is_plist = data.player_list;

	const content = `Pools randoms générées: ${
		is_pools_generated ? "Oui" : "Non"
	}\nNom du tournoi: ${data.tournament_name}\nInscriptions ouvertes: ${
		data.open ? "Oui" : "Non"
	}\nCapacité du tournoi: ${player_list.max_amount}\nJoueurs inscrits: ${
		player_list.current_amount
	}`;

	if (is_pools_generated && option === "pools") {
		const pools = generate_pools_string(data);
		return content.concat(`\n\n${pools}`);
	} else if (is_plist && option === "list") {
		const plist = generate_plist_string(data);
		return content.concat(`\n\n${plist}`);
	} else if (is_pools_generated && is_plist && option === "all") {
		const pools = generate_pools_string(data);
		const plist = generate_plist_string(data);
		return content.concat(`\n\n${pools}\n\n${plist}`);
	}

	return content;
};

const get_command_options = (interaction) => {
	const options = interaction.options._hoistedOptions;

	return options.map((element) => element.value);
};

export {
	openInscriptions,
	generate_pools_string,
	resolvePlayerList,
	get_infos,
	stringify_infos,
	get_command_options,
};
