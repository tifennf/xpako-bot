import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("init")
		.setDescription("Démarre une session de tournois")
		.setDefaultPermission(false)
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("Nom de la session de tournois")
				.setRequired(true)
		)
		.addIntegerOption((option) =>
			option
				.setName("max_player")
				.setDescription(
					"Nombre de joueurs maximum dans le tournois ( 8 16 32 64 )"
				)
				.setRequired(true)
		),
	execute: async (interaction) => {
		const options = interaction.options._hoistedOptions;

		const init = {
			name: options[0].value,
			max_player: options[1].value,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(init),
		};

		const res = await fetch("http://localhost:3024/tournament", requestOptions);
		const body = await res.json();

		const message = await interaction.reply({
			content: JSON.stringify(body),
			fetchReply: true,
		});

		message.react("😄");
	},
};
