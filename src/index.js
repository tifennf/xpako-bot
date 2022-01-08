import { Client, Collection, Intents, MessageEmbed } from "discord.js";

import commands from "./commands/_commands.js";
import fetch from "node-fetch";
import config from "../config.js";
import { unregister, unregister_button } from "./utils/commands.js";

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

		const discriminator = parseInt(message.author.discriminator, 10);
		const { id } = message.author;
		const league_name = message.content;

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

			if (res.status !== 200) {
				throw "Invalid input";
			}

			message.react("✅");
		} catch (err) {
			message.react("⛔");
		}
	}

	if (message.channelId === "927560494473175061") {
		const info = new MessageEmbed()
			.setTitle("Inscription validée !")
			.setColor("EB1EB5")
			.setDescription(
				"Si jamais tu n'as pas enregistré le bon pseudo ou que tu veux annuler ton inscription, appuie sur le bouton rouge juste en-dessous."
			)
			.addField("Pseudo LoL/TFT", "xxx");

		const msg = {
			embeds: [info],
			components: [unregister_button],
		};

		message.author.send(msg);
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

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isButton()) {
		return;
	}

	await unregister(interaction);
});

client.login(token);
