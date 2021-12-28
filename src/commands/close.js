import { SlashCommandBuilder } from "@discordjs/builders";
import { open_inscriptions } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("close")
		.setDescription("Ferme les inscriptions pour le tournoi")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const content = "Inscriptions fermées, /open pour les ouvrir";

		open_inscriptions(interaction, content, true);
	},
};
