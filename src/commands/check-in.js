import { SlashCommandBuilder } from "@discordjs/builders";
import { get_infos } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("check-in")
		.setDescription("Envoi un message privé de rappel aux joueurs inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const data = await get_infos();

		console.log(interaction.user.id);

		const id_list = data.player_list.list.map((player) => player.discord_id);

		console.log(id_list);

		const guildMembers = await interaction.guild.members.fetch();

		guildMembers.each((guildMember) => {
			const { user } = guildMember;

			const { id } = user;

			console.log(id);

			if (id_list.includes(id)) {
				user.send("blablabla");
			}
		});

		interaction.reply("Check-in fait");
	},
};
