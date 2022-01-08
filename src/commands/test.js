import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { get_infos } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Envoi un message privé de rappel aux joueurs inscrits")
		.setDefaultPermission(false)
		.addIntegerOption((option) =>
			option
				.setName("message_index")
				.setDescription("Quel message envoyer ? 1(24h) 2(15min)")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const data = await get_infos();

		const options = interaction.options._hoistedOptions;

		const which_message = options[0].value;

		try {
			if (which_message < 1 || which_message > 2) {
				throw "Aucun message sélectionné";
			}

			const message_list = [
				"Hello,\n\nJe t'envoie ce message pour te rappeler **ton inscription à notre tournoi hebdomadaire !**\nIl aura lieu demain soir sur notre serveur discord : https://discord.gg/SkMSdyTFjd\n\n**Est-ce que tu confirmes ta présence ?**\n\nMerci d'avance de ta réponse, et good luck !",
				"Hello,\n\nNotre tournoi débute dans **15 minutes !**\nTiens toi prêt et rejoint notre Discord : https://discord.gg/SkMSdyTFjd\n\nSi tu es dans **l'incapacité de partager** ce bon moment avec nous, **utilise la réaction 🟥 afin de libérer ta place !**\n\nA tout de suite !",
			];

			const id_list = data.player_list.list.map((player) => player.discord_id);

			const guildMembers = await interaction.guild.members.fetch();

			const buttons = [
				{
					type: 1,
					components: [
						{
							style: 3,
							label: `Oui`,
							custom_id: `row_0_button_3`,
							disabled: false,
							type: 2,
						},
						{
							style: 4,
							label: `Non`,
							custom_id: `row_0_button_4`,
							disabled: false,
							type: 2,
						},
					],
				},
			];

			const button_header = {
				color: "#fff",
				title: "Est-ce que tu confirmes ta présence ?",
			};

			guildMembers.each(async (guildMember) => {
				const { user } = guildMember;

				const { id } = user;

				// if (id_list.includes(id)) {
				// 	const content = message_list[which_message - 1];

				// 	await user.send(content);
				// }
				if (id === "255103821657669635") {
					const content = message_list[which_message - 1];

					const msg = await user.send({
						content,
						embeds: [button_header],
						components: buttons,
					});
				}

				// console.log(user);
			});

			interaction.reply("Check-in fait");
		} catch (error) {
			interaction.reply(error);
		}
	},
};
