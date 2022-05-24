const { MessageEmbed } = require('discord.js');
const minecraftApi = require('minecraft-api');
const talkedRecently = new Set();

module.exports = {
	name: "uuid",
	description: "Gives UUID of a Minecraft player",
	type: 'CHAT_INPUT',
	options: [
		{
			name: 'minecraft-username',
			description: 'Target player\'s Minecraft username',
			required: true,
			type: 'STRING',
		},
	],
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		if (talkedRecently.has(interaction.user.id)) {
			interaction.followUp({ embeds: [new MessageEmbed().setDescription(`Please wait **10 seconds** before executing this command again.`).setColor('RED')] });
		}
		else {
			const username = interaction.options.getString('minecraft-username');
			minecraftApi.uuidForName(`${username}`).then(uuid => {
				try {
					interaction.followUp({ embeds: [new MessageEmbed()
						.setDescription(`UUID of **${username}** is **${uuid}**.`)
						.setColor('RANDOM')] });
				}
				catch (error) {
					interaction.followUp({ embeds: [new MessageEmbed().setDescription('An error occured.').setColor('RED')] });
				}
			});

			talkedRecently.add(interaction.user.id);
			setTimeout(() => {
				// Removes the user from the set after a minute
				talkedRecently.delete(interaction.user.id);
			}, 10000);
		}
	},
};
