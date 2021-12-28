import { SlashCommandBuilder } from "@discordjs/builders";
import { get_infos } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifie la liste des inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const content = get_infos();

		await interaction.reply({
			content,
			fetchReply: true,
		});
	},
};
