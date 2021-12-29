import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export default {
	data: new SlashCommandBuilder()
		.setName("unregister")
		.setDescription("Annule votre inscription")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		console.log(interaction);

		// const { username } = interaction.author;

		// const discriminator = parseInt(interaction.author.discriminator, 10);
		// const id = parseInt(interaction.author.id, 10);
		// const league_name = interaction.me.content;

		// const player = {
		// 	league_name,
		// 	discord_username: username,
		// 	tag: discriminator,
		// 	discord_id: id,
		// };

		// const requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(player),
		// };

		// try {
		// 	const res = await fetch(
		// 		"http://localhost:3024/tournament/inscriptions",
		// 		requestOptions
		// 	);

		// 	if (res.status !== 200) {
		// 		throw "Invalid input";
		// 	}

		// 	message.react("✅");
		// } catch (err) {
		// 	message.react("⛔");
		// }
	},
};
