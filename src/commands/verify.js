import { SlashCommandBuilder } from "@discordjs/builders";
import { get_infos, stringify_infos } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifie la liste des inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const data = await get_infos();

		const content = stringify_infos(data);

		await interaction.reply({
			content,
			fetchReply: true,
		});
	},
};
