import { SlashCommandBuilder } from "@discordjs/builders";
import fs from "fs/promises";
import toml from "toml";

export default {
	data: new SlashCommandBuilder()
		.setName("riot-api-key")
		.setDescription("Change la clef riot api")
		.setDefaultPermission(false)
		.addStringOption((option) =>
			option.setName("key").setDescription("Clef api riot").setRequired(true)
		),
	execute: async (interaction) => {
		const options = interaction.options._hoistedOptions;

		const key = options[0].value;

		try {
			const file = await fs.readFile("../../../services/tournament-core/config.toml");

			const config = toml.parse(file);

			console.log(config);
		} catch (error) {
			console.error(error);
		}
	},
};
