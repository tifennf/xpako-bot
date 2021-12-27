import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("start")
		.setDescription("Génère les pools randoms du tournoi"),
	// .setDefaultPermission(false),
	execute: async (interaction) => {
		const message = await interaction.reply({
			content: "ppppppp...",
			fetchReply: true,
		});

		message.react("😄");
	},
};
