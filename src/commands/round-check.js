import { SlashCommandBuilder } from "@discordjs/builders";
import { get_infos } from "../utils/commands.js";
import { round_check_message } from "../utils/messages.js";

export default {
	data: new SlashCommandBuilder()
		.setName("round-check")
		.setDescription(
			"Envoi un message privé de rappel aux participants, puis vire les afk"
		)
		.setDefaultPermission(false)
		.addIntegerOption((option) =>
			option
				.setName("time")
				.setDescription("Limite de temps en minutes")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const options = interaction.options._hoistedOptions;
		const time = options[0].value;

		const data = await get_infos();

		try {
			const id_list = data.player_list.list.map((player) => player.discord_id);

			const guildMembers = await interaction.guild.members.fetch();

			guildMembers.each(async (guildMember) => {
				const { user } = guildMember;

				const { id } = user;

				if (id_list.includes(id)) {
					user.send(round_check_message(time));
				}
			});

			interaction.reply(`Round-check de ${time} minutes lancé`);
		} catch (error) {
			interaction.reply(error);
		}
	},
};
