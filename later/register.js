const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');

module.exports = {
	name: "register",
	description: "Register command for new users",
	type: 'CHAT_INPUT',
	options: [
		{
			name: "minecraft-ign",
			description: "Specify your Minecraft username (Cracked launchers including TLauncher works)",
			type: "STRING",
			required: true,
		},
		{
			name: "twitter",
			description: "Specify your Twitter username (optional)",
			type: "STRING",
			required: false,
		},
		{
			name: "youtube",
			description: "Specify your YouTube URL (optional)",
			type: "STRING",
			required: false,
		},
	],
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		if (!interaction.user.roles.cache.has(config.waitingList)) return interaction.followUp({ content: "You've already been registed on our server, making this command useless for you." });
        const mcIgn = interaction.options.getString('minecraftIGN');
        const twitter = interaction.options.getString('twitter');
        const youtube = interaction.options.getString('youtube');

        interaction.followUp({ content: "Your information has been added to our database. Please do `"})
	},
};
