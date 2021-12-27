import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("reset")
		.setDescription("Rénitialise la liste des joueurs inscrits")
		.defaultPermission(false),
	execute: async (interaction) => {
		interaction.reply("reset...");
	},
};
