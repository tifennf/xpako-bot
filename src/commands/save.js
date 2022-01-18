import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";
import config from "../../config";

const { ip } = config;

export default {
	data: new SlashCommandBuilder()
		.setName("save")
		.setDescription("Sauvegarde la liste des joueurs inscrits")
		.setDefaultPermission(false),
	execute: async (interaction) => {
		const content =
			"Sauvegarde des joueurs inscrits effectuée, /reload pour la charger";

		try {
			const res = await fetch(ip + "/save");

			if (res.status !== 200) {
				throw "Error...";
			}
			interaction.reply(content);
		} catch (error) {
			interaction.reply("Error...");
		}
	},
};
