import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("unregister")
		.setDescription("Annule votre inscription")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const { user } = interaction;

		const { username } = user;

		const discriminator = parseInt(user.discriminator, 10);
		const id = parseInt(user.id, 10);
		const league_name = "xxx";

		const player = {
			league_name,
			discord_username: username,
			tag: discriminator,
			discord_id: id,
		};

		const requestOptions = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(player),
		};

		try {
			const res = await fetch(
				"http://localhost:3024/tournament/inscriptions",
				requestOptions
			);

			if (res.status !== 200) {
				throw "Invalid input";
			}

			interaction.reply({
				content: "Votre inscription est annulé",
				ephemeral: true,
			});
		} catch (err) {
			interaction.reply({
				content: "Vous n'êtes pas inscrit",
				ephemeral: true,
			});
		}
	},
};
