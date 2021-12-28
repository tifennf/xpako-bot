import { SlashCommandBuilder } from "@discordjs/builders";
import open_inscriptions from "../utils/commands.js";
export default {
	data: new SlashCommandBuilder()
		.setName("open")
		.setDescription("Ouvre les inscriptions pour le tournoi")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const content = "Inscriptions ouvertes, /close pour les fermer";

		open_inscriptions(interaction, content, true);
	},
};
