const unregister_button = {
	type: 1,
	components: [
		{
			style: 4,
			label: `Annuler mon inscription`,
			custom_id: `row_0_button_3`,
			disabled: false,
			type: 2,
		},
	],
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
		embeds: [
			{
				color: "EB1EB5",
				title: "Est-ce que tu confirmes ta présence ?",
			},
		],
		components: [
			{
				type: 1,
				components: [yes_button, no_button],
			},
		],
	},
};

const message_2 = {
	header: {
		content:
			"Hello,\n\nNotre tournoi débute dans **15 minutes !**\nTiens toi prêt et rejoint notre Discord : https://discord.gg/SkMSdyTFjd\n\nSi tu es dans **l'incapacité de partager** ce bon moment avec nous, **clique sur le bouton rouge en bas !**\n\nA tout de suite !",
	},
	footer: {
		content: "\u200b",
		embeds: [
			{
				color: "EB1EB5",
				title: "Est-ce que tu confirmes ta présence ?",
			},
		],

		components: [
			{
				type: 1,
				components: [
					{
						style: 4,
						label: `Annuler mon inscription`,
						custom_id: `row_0_button_3`,
						disabled: false,
						type: 2,
					},
				],
			},
		],
	},
};

export { unregister_button, message_1, message_2 };
