const unregister_embed = {
	color: "EB1EB5",
	title: "Si tu ne pourras pas être présent, clique sur ce bouton",
};

const unregister_button = {
	style: 4,
	label: `Annuler mon inscription`,
	custom_id: `row_0_button_3`,
	disabled: false,
	type: 2,
};

const yes_button = {
	style: 3,
	label: `Oui`,
	custom_id: `yes_button`,
	disabled: false,
	type: 2,
};
const no_button = {
	style: 4,
	label: `Non`,
	custom_id: `no_button`,
	disabled: false,
	type: 2,
};

const message_1 = {
	header: {
		content:
			"Hello,\n\nJe t'envoie ce message pour te rappeler **ton inscription à notre tournoi hebdomadaire !**\nIl aura lieu demain soir sur notre serveur discord : https://discord.gg/SkMSdyTFjd\n\nMerci d'avance de ta réponse, et good luck !",
	},
	footer: {
		content: "\u200b",
		embeds: [unregister_embed],
		components: [
			{
				type: 1,
				components: [unregister_button],
			},
		],
	},
};

const message_2 = {
	content:
		"Hello,\n\nNotre tournoi débute dans **15 minutes !**\nTu as **10min** pour valider ta présence en **cliquant** sur le bouton vert en bas, autrement nous serons obligé de te désinscrire.\n\nA tout de suite !",
	embeds: [unregister_embed],
	components: [
		{
			type: 1,
			components: [yes_button],
		},
		{
			type: 1,
			components: [no_button],
		},
	],
};

export { unregister_button, message_1, message_2 };
