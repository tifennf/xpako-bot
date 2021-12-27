import { Client, Intents } from "discord.js";

import config from "../config.js";

const { token } = config;

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});

client.once("ready", () => {
	console.log("ready!");
});

client.on("interactionCreate", async (interation) => {
	if (!interation.isCommand()) {
		return;
	}

	const { commandName } = interation;

	if (commandName === "ping") {
		const guildMembers = await interation.guild.members.list({ limit: 20 });
		guildMembers.forEach((guildMember) => {
			const { username } = guildMember.user;

			if (username.toLowerCase() === "havsqa") {
				guildMember.user.send("fdp");
			}
		});

		await interation.reply("Pong!");
	} else if (commandName === "help") {
		await interation.reply("helping ");
	} else if (commandName === "xpako") {
		await interation.reply("xpako");
	}
});

client.login(token);
