import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifie la liste des inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const message = await interaction.reply({
			content: "Infos...",
			fetchReply: true,
		});

		message.react("😀");
	},
};
