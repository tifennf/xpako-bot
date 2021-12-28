import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

const resolvePlayerList = (data) => {
	if (!data.player_list) {
		return { max_amount: 0, current_amount: 0 };
	} else {
		return data.player_list;
	}
};

export default {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifie la liste des inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
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

		await interaction.reply({
			content,
			fetchReply: true,
		});
	},
};
