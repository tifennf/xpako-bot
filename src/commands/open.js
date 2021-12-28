import { SlashCommandBuilder } from "@discordjs/builders";
// import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("open")
		.setDescription("Ouvre les inscriptions pour le tournoi")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		console.log(interaction);

		// const res = await fetch(
		// 	"http://localhost:3024/tournament/inscriptions/status"
		// );
		// const body = await res.json();

		const message = await interaction.reply({
			content: "Ouverture des inscriptions...",
			fetchReply: true,
		});

		message.react("😄");
	},
};
