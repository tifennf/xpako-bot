// import { SlashCommandBuilder } from "@discordjs/builders";
// import { get_infos, message_1, message_2 } from "../utils/commands.js";

// export default {
// 	data: new SlashCommandBuilder()
// 		.setName("test")
// 		.setDescription("Envoi un message privé de rappel aux joueurs inscrits")
// 		.setDefaultPermission(false)
// 		.addIntegerOption((option) =>
// 			option
// 				.setName("message_index")
// 				.setDescription("Quel message envoyer ? 1(24h) 2(15min)")
// 				.setRequired(true)
// 		),
// 	execute: async (interaction) => {
// 		const data = await get_infos();

// 		const options = interaction.options._hoistedOptions;

// 		const which_message = options[0].value;

// 		try {
// 			if (which_message < 1 || which_message > 2) {
// 				throw "Aucun message sélectionné";
// 			}

// 			const message = which_message === 1 ? message_1 : message_2;

// 			// const id_list = data.player_list.list.map((player) => player.discord_id);

// 			const guildMembers = await interaction.guild.members.fetch();

// 			guildMembers.each(async (guildMember) => {
// 				const { user } = guildMember;

// 				const { id } = user;

// 				if (id === "208092469546582017") {
// 					await user.send(message.header);
// 					user.send(message.footer);
// 				}
// 			});

// 			interaction.reply("Check-in fait");
// 		} catch (error) {
// 			interaction.reply(error);
// 		}
// 	},
// };
