import { SlashCommandBuilder } from "@discordjs/builders";
import { get_infos } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("check-in")
		.setDescription("Envoi un message privé de rappel aux joueurs inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const data = await get_infos();

		const id_list = data.player_list.map((player) => player.discord_id);

		console.log(id_list);

		const guildMembers = await interaction.guild.members.list({ limit: 20 });
		guildMembers.forEach((guildMember) => {
			const { user } = guildMember;

			const { id } = user;

			if (id_list.includes(id)) {
				user.send("blablabla");
			}
		});

		interaction.reply("Check-in fait");
	},
};
