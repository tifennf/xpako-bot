import { SlashCommandBuilder } from "@discordjs/builders";
import { generate_pools_string } from "../utils/commands.js";
import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("start")
		.setDescription("Génère les pools randoms du tournoi")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		try {
			const res = await fetch("http://localhost:3024/tournament");
			const body = await res.json();

			const { data } = body;

			const content = generate_pools_string(data);

			interaction.reply({
				content,
				fetchReply: true,
			});
		} catch (error) {
			console.error(error);

			interaction.reply({
				content: "Error... Pas assez de joueurs ?",
				fetchReply: true,
			});
		}
	},
};
