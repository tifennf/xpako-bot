import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("open")
		.setDescription("Ouvre les inscriptions pour le tournoi")
		.defaultPermission(false),
	execute: async (interaction) => {
		const message = await interaction.reply({
			content: "Ouverture des inscriptions...",
			fetchReply: true,
		});

		message.react("😄");
	},
};
