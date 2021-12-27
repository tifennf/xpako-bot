import { Client, Collection, Intents } from "discord.js";

import commands from "./commands/_commands.js";

import config from "../config.js";

const { token } = config;

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.commands = new Collection();

commands.forEach((com) => {
	client.commands.set(com.data.name, com);
});

client.once("ready", () => {
	console.log("ready!");
});

client.on("messageCreate", async (message) => {
	if (message.channelId === "412758695798112266") {
		message.react("✅");
	}
});

client.on("interactionCreate", async (interation) => {
	if (!interation.isCommand()) {
		return;
	}

	const command = client.commands.get(interation.commandName);

	if (!command) {
		return;
	}

	try {
		await command.execute(interation);
	} catch (error) {
		console.error(error);
		await interation.reply({ content: "Error", ephemeral: true });
	}
});

client.login(token);
