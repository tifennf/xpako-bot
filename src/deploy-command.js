import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "../config.js";

const { guildId, clientId, token } = config;

const commands = [
	new SlashCommandBuilder().setName("ping").setDescription("test"),
	new SlashCommandBuilder().setName("help").setDescription("test"),
	new SlashCommandBuilder().setName("xpako").setDescription("test"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log("Succes on registering commands"))
	.catch(console.error);
