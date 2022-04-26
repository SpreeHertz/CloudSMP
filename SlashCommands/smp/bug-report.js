const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');

module.exports = {
	name: "report-bug",
	description: "Report a bug/player",
	options: [
		{
			name: "bug",
			description: "Describe your bug",
			type: "STRING",
			required: true,
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
	run: async (client, interaction) => {
		// Fetch all necessary information
		const bugReport = interaction.options.getString('bug');
		const proof = interaction.options.getString('proof');

		// no arguments
		if (!proof) return interaction.followUp({ content: 'Too less arguments. Make sure you\'re using the command correctly.\n For bug reports, use the `bug` and `proof` options.' });
		// the channel to send
		const getGuild = client.guilds.cache.get(config.guildId);
		const channel = getGuild.channels.cache.get('942263990715826217');

		// generateString for bug ID
		let text = "";
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < 5; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length));}

		text;

		// bug reporting
		if (bugReport && proof) {
			const bugReportEmbed = new MessageEmbed()
				.setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
				.setTitle(`Bug report`)
				.addField('Proof', `${proof || 'None specified'}`)
				.addField('Bug Description', `${bugReport || 'None specified'}`)
				.setColor('RANDOM')
				.setFooter(`Bug ID: ${text}`)
				.addField('Reporter ID', `${interaction.user.id}`)
				.setTimestamp();
			channel.send({ embeds: [bugReportEmbed], content: `**Proof(s):** ${proof}` });
			try {
				// dm saying received by staff
				interaction.user.send({ content: `Your bug report has been received by the staff team. Bug ID: \`${text}\`` });
				// bug report sent to the channel which will be deleted
				interaction.followUp({ content: `Your bug report has been sent. Check your DMs for the ID.\nThis message will disappear in 10 seconds.` }).then(m =>
					setTimeout(() => {
						m.delete();
					}, 10000));
			}
			catch (error) {
				// if cannot be dmed
				interaction.followUp({ content: `Your bug report has been sent!\nBug ID: \`${text}\`\nThis message will dissapear in 10 seconds.` }).then(m =>
					setTimeout(() => {
						m.delete();
					}, 10000));
			}

		}
	},
};
