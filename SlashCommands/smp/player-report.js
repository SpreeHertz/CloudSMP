/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');

module.exports = {
	name: "report-player",
	description: "Report a player",
	options: [
		{
			name: "player",
			description: "Who the player is (Specify Minecraft IGN)",
			type: "STRING",
			required: true,
		},
		{
			name: "rulebroken",
			description: "Which rule was broken (only use this option for reporting players)",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "Harrasment",
					value: "harrasment-report",
				},
				{
					name: "Too much toxicity",
					value: "toxicity-report",

				},
				{
					name: "IP grabbers/harmful link sender",
					value: "harmful-links",
				},
				{
					name: "Dead chest camping",
					value: "dead-chest-camping",
				},
				{
					name: "Hub trapping",
					value: "hub-trapping",
				},
				{
					name: "Cheating",
					value: "cheating-report",
				},
				{
					name: "Command abuse",
					value: "command-abuse",
				},
			],
		},
		{
			name: "proof",
			description: "Proof of rule breaking/bug happening (use links to show images) [separate proofs with commas]",
			required: true,
			type: "STRING",
		},

	],
	type: 'CHAT_INPUT',
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction, args) => {
		const player = interaction.options.getString('player');
		const rulebroken = interaction.options.get('rulebroken').value;
		// the channel to send
		const getGuild = client.guilds.cache.get(config.guildId);
		const channel = getGuild.channels.cache.get('941986669832335381');
		const proof = interaction.options.getString('proof');

		if (!proof) return interaction.followUp({ content: 'Too less arguments. Make sure you\'re using the command correctly.\n For player reports, use the `player`, `rulebroken` and `proof` options.' });

		// generateString for bug ID
		let text = "";
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < 5; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length));}

		text;
		// player Reporting
		if (player && rulebroken && proof) {
			const playerReportEmbed = new MessageEmbed()
				.setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
				.setTitle(`Player report`)
				.addField('Player reported', `${player || 'None specified'}`)
				.addField('Rule broken', `${rulebroken || 'None specified'}`)
				.addField('Proof', `${proof || 'None specified'}`)
				.setColor('RANDOM')
				.addField('Reporter ID', `${interaction.user.id}`)
				.setFooter(`Report ID: ${text}`)
				.setTimestamp();
			channel.send({ embeds: [playerReportEmbed], content: `**Proof(s):** ${proof}` });
			try {
				interaction.user.send({ content: `Your player report has been received by the staff team. Report ID: \`${text}\`` });
				interaction.followUp({ content: 'Your report has been sent! Check your DMs for the ID.\nThis message will disappear in 10 seconds.' }).then(m =>
					setTimeout(() => {
						m.delete();
					}, 10000));
			}
			catch (error) {
				interaction.followUp({ content: `Your player report has been sent to the staff team.\nReport ID: \`${text}\`\nThis message will disappear in 10 seconds.` }).then(m =>
					setTimeout(() => {
						m.delete();
					}, 10000));
			}
		}
	},
};
