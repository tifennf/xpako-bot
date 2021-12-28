import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("open")
		.setDescription("Ouvre les inscriptions pour le tournoi")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const res = await fetch("http://localhost:3024");
		const info = await res.text();

		const message = await interaction.reply({
			content: info,
			fetchReply: true,
		});

		message.react("😄");
	},
};
