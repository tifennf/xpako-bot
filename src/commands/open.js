import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("open")
		.setDescription("Ouvre les inscriptions pour le tournoi")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const action = {
			open: true,
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

			const content = "Inscriptions ouvertes, /close pour les fermer";

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
	},
};
