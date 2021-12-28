import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("reset")
		.setDescription("Rénitialise la liste des joueurs inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		await fetch("http://localhost:3024/tournament/reset");

		const content = "Tournoi rénitialisé";

		interaction.reply({
			content,
			fetchReply: true,
		});
	},
};
