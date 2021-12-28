import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";
export default {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifie la liste des inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const res = await fetch("http://localhost:3024/info");
		const body = await res.json();

		const content =
			res.status === 200
				? "```json\n" + JSON.stringify(body.data) + "\n```"
				: `Error occured\nStatus: ${body.status}\nInfo: ${body.data}`;

		await interaction.reply({
			content,
			fetchReply: true,
		});
	},
};
