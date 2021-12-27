import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("close")
		.setDescription("Ferme les inscriptions pour le tournoi")
		.defaultPermission(false),
	execute: async (interaction) => {
		interaction.reply("Fermeture des inscriptions...");
	},
};
