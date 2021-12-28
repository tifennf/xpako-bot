import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";
export default {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifie la liste des inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const res = await fetch("http://localhost:3024/info");
		const info = await res.json();

		const content = "```json\n" + JSON.stringify(info.data) + "\n```";

		await interaction.reply({
			content,
			fetchReply: true,
		});
	},
};
