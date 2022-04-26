const { MessageEmbed } = require("discord.js");


module.exports = {
	name: "troubleshoot",
	description: "Search for an issue and get tips/help",
	options: [
		{
			name: "issue",
			description: "What your issue is",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "Falling to the void",
					value: "voidFalling",
				},
				{
					name: "Connection throttled! Please wait before reconnecting.",
					value: "throttlingError",
				},
				{
					name: "Connection refused: No further information",
					value: "connectionRefused",
				},
				{
					name: "You are not whitelisted",
					value: "whitelistingError",
				},
				{
					name: "Forgotten password",
					value: "passwordForgotten",
				},
				{
					name: "Connection reset",
					value: "connectionReset",
				},

			],
		},
	],
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		const issueChoices = interaction.options.get('issue').value;

		if (issueChoices == 'voidFalling') {
			const voidFallingEmbed = new MessageEmbed()
				.setTitle('Falling into the void')
				.setDescription('Falling to the void could be due to several reasons. They are:')
				.addField('Issue Reason #1', 'Chunks are not loaded for you yet')
				.addField('Issue Reason #2', 'Your internet is unstable/laggy')
				.addField('Issue reason #3', 'Server lag (**unlikely**)')
				.setColor('RANDOM')
				.setFooter('If you truly believe this is an issue because of server lag, please contact the developers.');
			interaction.followUp({ embeds: [voidFallingEmbed] });

		}
		else if (issueChoices == 'throttlingError') {
			const throttlingError = new MessageEmbed()
				.setTitle('Throttling Error')
				.setDescription('Here are a few fixes for throttling issues:')
				.addField('Tip #1', 'Click on the `Refresh` button multiple times')
				.addField('Tip #2', 'Make sure you\'re connecting from `smp.cloudstriked.com` and **not** `mc.cloudstriked.com`')
				.addField('Tip #3', 'Restart your internet/contact your Internet Service Provider (ISP)')
				.setColor('RANDOM');

			interaction.followUp({ embeds: [throttlingError] });

		}
		else if (issueChoices == 'connectionRefused') {
			const connectionRefused = new MessageEmbed()
				.setTitle('Connection Refused')
				.setDescription('Here are a few fixes for `Connection refused` error')
				.addField('Tip #1', 'Click on the `Refresh` button multiple times')
				.addField('Tip #2', 'Make sure you\'re connecting from `smp.cloudstriked.com` and **not** `mc.cloudstriked.com`')
				.addField('Tip #3', 'Restart your internet/contact your Internet Service Provider (ISP)')
				.setColor('RANDOM');
			interaction.followUp({ embeds: [connectionRefused] });
		}
		else if (issueChoices == 'whitelistingError') {
			const whitelistingError = new MessageEmbed()
				.setTitle("Whitelisting Error")
				.setDescription('Whitelisting issues regularly happen and they could be caused by a handful of reasons. They could be because:')
				.addField('Cause #1', 'Your name had spaces/unique characters in it')
				.addField('Cause #2', 'Your name was too common')
				.addField('Fix #1', 'If you have a TLauncher account, uncheck the `Accounts` box, type in a new name which is unique and must have no spaces.')
				.addField('Fix #2', 'Give us your Minecraft UUID. Click [here](https://www.minecraftforum.net/forums/support/java-edition-support/2392452-finding-your-uuid-using-your-minecraft-client) to know how')
				.addField('Optional Tip', 'Maybe try making a fresh account with/without a VPN.')
				.setImage('https://cdn.discordapp.com/attachments/934008695925403681/935957796397129768/unknown.png')
				.setColor('RANDOM');
			interaction.followUp({ embeds: [whitelistingError] });
		}
		else if (issueChoices === 'Forgot password') {
			const passwordForgotten = new MessageEmbed()
				.setTitle('Password forgotten')
				.addField('Possible Fix', 'Make a new TLauncher account with a new Account and VPN and make sure not to forget your password next time.')
				.setColor('RANDOM')
				.addField('Other Fix', 'Contact the SMP Staff.');
			interaction.followUp({ embeds: [passwordForgotten] });
		}
		else if (issueChoices === 'connectionReset') {
			const connectionReset = new MessageEmbed()
				.setTitle('Connection Reset')
				.setDescription('Here are a few fixes for `Connection reset` error')
				.addField('Tip #1', 'Click on the `Refresh` button multiple times')
				.addField('Tip #2', 'Make sure you\'re connecting from `smp.cloudstriked.com` and **not** `mc.cloudstriked.com`')
				.addField('Tip #3', 'Restart your internet/contact your Internet Service Provider (ISP)')
				.setColor('RANDOM');
			interaction.followUp({ embeds: [connectionReset] });
		}

	},
};
