import { Client, Collection, Intents } from "discord.js";

import commands from "./commands/_commands.js";
import fetch from "node-fetch";
import config from "../config.js";

const { token, guildId } = config;

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.commands = new Collection();

const commandsList = commands.map((com) => {
	client.commands.set(com.data.name, com);

	return com.data.toJSON();
});

client.once("ready", async () => {
	console.log("Bot ready !");

	const guild = client.guilds.cache.get(guildId);

	const res = await guild.commands.set(commandsList);

	res.forEach(async (cmd) => {
		const permissions = [
			{
				id: "925133743071559751",
				type: "ROLE",
				permission: true,
			},
		];

		await cmd.permissions.set({
			permissions,
		});
	});
	console.log("Permissions set !");
});

client.on("messageCreate", async (message) => {
	if (message.channelId === "924720650608861214") {
		const { username } = message.author;
		// const { discriminator } = message.author;
		// const { id } = message.author;
		const discriminator = parseInt(message.author.discriminator, 10);
		const id = parseInt(message.author.id, 10);

		const league_name = message.content;

		console.log(discriminator);
		console.log(id);

		const player = {
			league_name,
			discord_username: username,
			tag: discriminator,
			discord_id: id,
		};

		const requestOptions = {
			method: "POST",
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

			console.log(res.status);

			if (res.status !== 200) {
				throw "Invalid input";
			}

			message.react("✅");
		} catch (error) {
			console.error(error);

			message.react("❌");
		}
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
