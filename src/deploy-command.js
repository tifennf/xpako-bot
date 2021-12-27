import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "../config.js";

import commands from "./commands/_commands.js";

const { guildId, clientId, token } = config;

const commandsList = commands.map((command) => command.data.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
	.put(Routes.applicationGuildCommands(clientId, guildId), {
		body: commandsList,
	})
	.then(() => console.log("Succes on registering commands"))
	.catch(console.error);
