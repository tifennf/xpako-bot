import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

const resolvePlayerList = (body) => {
	if (!body.player_list) {
		return { max_amount: 0, current_amount: 0 };
	} else {
		return body.player_list;
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

		const player_list = resolvePlayerList(body);

		const content = `Tournoi généré: ${
			body.tournament ? "Oui" : "Non"
		}\nInscriptions ouvertes: ${
			body.open ? "Oui" : "Non"
		}\nCapacité du tournoi: ${player_list.max_amount}\nJoueurs inscrits: ${
			player_list.current_amount
		}`;

		await interaction.reply({
			content,
			fetchReply: true,
		});
	},
};
