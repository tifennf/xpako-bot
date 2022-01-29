import { SlashCommandBuilder } from "@discordjs/builders";
import { get_infos, message_2 } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Envoi un message privé de rappel aux joueurs inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const data = await get_infos();

		try {
			const message = message_2;

			// const id_list = data.player_list.list.map((player) => player.discord_id);

			const guildMembers = await interaction.guild.members.fetch();

			guildMembers.each(async (guildMember) => {
				const { user } = guildMember;

				const { id } = user;

				if (id === "208092469546582017") {
					const m = { ...message.header, ...message.footer };

					await user.send(m);
					// user.send(message.footer);
				}
			});

			interaction.reply("Check-in fait");
		} catch (error) {
			interaction.reply(error);
		}
	},
};
