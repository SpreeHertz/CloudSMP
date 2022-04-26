const { MessageEmbed } = require("discord.js");
const db = require("../../models/userinfo");

module.exports = {
	name: "userinfo",
	description: "Returns information about a user including Minecraft verification details",
	type: 'CHAT_INPUT',
	options: [
		{
			name: "user",
			description: "Who's user information to fetch",
			type: "USER",
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
		const user = interaction.options.getUser('user');
		db.findOne({ UserId: db.UserId, MinecraftIGN: db.MinecraftIGN, Twitter: db.Twitter, YouTube: db.YouTube, Remarks: db.Remarks }, async (err, data) => {
			if (err) throw err;
			if (data.content.length) {
				if (db.Userid === user.id) {
					const embed = new MessageEmbed()
						.setAuthor(user.username, user.avatarURL({ dynamic: true }))
						.setTitle('User information')
						.addField('Minecraft IGN', db.MinecraftIGN)
						.addField('Twitter', db.Twitter || 'N/A')
						.addField('YouTube', db.YouTube || 'N/A')
						.addField('Remarks', db.Remarks || 'N/A')
						.addField('User ID', db.UserId || 'N/A')
						.setColor('RANDOM');
					interaction.followUp({ embeds: [embed] });
				}

			}
			else {
				interaction.followUp({ content: "Nothing was found." });
			}
		});
	},
};