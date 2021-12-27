import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("check-in")
		.setDescription("Envoi un message privé de rappel aux joueurs inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const guildMembers = await interaction.guild.members.list({ limit: 20 });
		guildMembers.forEach((guildMember) => {
			const { username } = guildMember.user;

			if (username.toLowerCase() === "havsqa") {
				guildMember.user.send("fdp");
			}
		});

		interaction.reply("bip bip...");
	},
};
