import { SlashCommandBuilder } from "@discordjs/builders";
import { get_infos } from "../utils/commands.js";

export default {
	data: new SlashCommandBuilder()
		.setName("check-in")
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
				"Hello,\n\nJe t'envoie ce message pour te rappeler **ton inscription à notre tournoi hebdomadaire !**\n\nIl aura lieu demain soir sur notre serveur discord : https://discord.gg/SkMSdyTFjd\n\n**Est-ce que tu confirmes ta présence ?**\n\nMerci d'avance de ta réponse, et good luck !",
				"Hello,\n\nNotre tournoi débute dans **15 minutes !**\n\nTiens toi prêt et rejoint notre Discord : https://discord.gg/SkMSdyTFjd\n\nSi tu es dans **l'incapacité de partager** ce bon moment avec nous, **utilise la réaction 🟥 afin de libérer ta place !**\n\nA tout de suite !",
			];

			const id_list = data.player_list.list.map((player) => player.discord_id);

			const guildMembers = await interaction.guild.members.fetch();

			guildMembers.each((guildMember) => {
				const { user } = guildMember;

				const { id } = user;

				if (id_list.includes(id)) {
					const content = message_list[which_message - 1];

					user.send(content).react("🟥");
				}
			});

			interaction.reply("Check-in fait");
		} catch (error) {
			interaction.reply(error);
		}
	},
};
