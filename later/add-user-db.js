const db = require('../../models/userinfo');

module.exports = {
	name: "adduser",
	description: "Add user to database",
	type: 'CHAT_INPUT',
	options: [
		{
			name: "userId",
			type: "STRING",
			description: "userId",
			required: true,
		},
		{
			name: "minecraftIGN",
			type: "STRING",
			description: "minecraftign",
			required: true,
		},
		{
			name: "twitter",
			type: "STRING",
			description: "twitter",
			required: true,
		},
		{
			name: "youtube",
			type: "STRING",
			description: "bro i should kms atp",
			required: true,
		},
		{
			name: "remarks",
			type: "STRING",
			description: "yay.",
		},
	],
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		const useridd = interaction.options.getString('userId');
		const minecraftIGN = interaction.options.getString('minecraftIGN');
		const twitter = interaction.options.getString('twitter');
		const youtube = interaction.options.getString('youtube');
		const remarks = interaction.options.getString('remarks');

		if (!interaction.user.id === '755826968901058682') return interaction.followUp({ content: "You are forbidden to use this." });
		db.findOne({ UserId: db.UserId, MinecraftIGN: db.MinecraftIGN, Twitter: db.Twitter, YouTube: db.YouTube, Remarks: db.Remarks }, async (err, data) => {
			if (err) throw err;
			if (!data) {
				data = new db({
					UserId: useridd,
					MinecraftIGN: minecraftIGN,
					Twitter: twitter,
					YouTube: youtube,
					Remarks: remarks,
				});
				interaction.followUp({ content: 'done. next' });
			}
			else {
				const obj = {

				};
				data.content.push(obj);
			}
			data.save();
		});
	},
};
