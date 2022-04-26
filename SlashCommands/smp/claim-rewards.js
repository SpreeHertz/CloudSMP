const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "claim-reward",
	description: "Claim your booster perks/invite rewards",
	type: 'CHAT_INPUT',
	options: [
		{
			name: 'type',
			description: 'What type of reward do you want to claim?',
			type: "STRING",
			required: true,
			choices: [
				{
					name: 'Booster perks',
					value: 'booster-perks',
				},
				{
					name: 'Invite rewards',
					value: 'invite-rewards',
				},
			],
		},
		{
			name: 'minecraft_username',
			description: 'Please specify your Minecraft username',
			type: "STRING",
			required: true,
		},
	],
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		const rewardType = interaction.options.get('type').value;
		const guild = interaction.guild;
		const channel = guild.channels.cache.get('967346108948955166');
		const mcUsername = interaction.options.getString('minecraft_username');

		if (rewardType === 'booster-perks') {
			const boosterEmbed = new MessageEmbed()
				.setTitle('Claim: Booster perks')
				.setDescription('<:c_verified:941623165682057276> I have requested the staff team to give you perks. You\'ll be notified when you receive it.')
				.setColor('GREEN')
				.setTimestamp()
				.setFooter({ text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.avatarURL({ dynamic: true })}` });
			interaction.followUp({ embeds: [boosterEmbed] });
			// Embed to be sent to the staff team
			channel.send({ content: `<@755826968901058682>`, embeds: [new MessageEmbed()
				.setDescription(`${interaction.user.username} has asked for ${rewardType}.`)
				.addField('Minecraft username', `${mcUsername}`)
				.setColor('RANDOM')
				.setTimestamp()
				.setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.avatarURL({ dynamic: true })}` })] });

		}
		if (rewardType === 'invite-rewards') {
			const inviteEmbed = new MessageEmbed()
				.setTitle('Claim: Invite rewards')
				.setDescription('<:c_verified:941623165682057276> I have requested the staff team to give you perks. You\'ll be notified when you receive your perks!')
				.setColor('GREEN')
				.setTimestamp()
				.setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.avatarURL({ dynamic: true })}` })
				.setFooter({ text: 'Make sure you have enough invites!' });
			interaction.followUp({ embeds: [inviteEmbed] });
			channel.send({ content: `<@755826968901058682>`, embeds: [new MessageEmbed()
				.setDescription(`**${interaction.user.username}** has asked for ${rewardType}. Make sure to check their invites.`)
				.setColor('RANDOM')
				.addField('Minecraft username', `${mcUsername}`)
				.addField('User ID', `${interaction.user.id}`)
				.setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.avatarURL({ dynamic: true })}` })] });
		}
	},
};
