module.exports = {
	name: "dm",
	description: "DM a user in the guild",
	aliases: ['pm'],
	run: async (client, message, args) => {
		if (!message.member.roles.cache.some(role => role.name === 'Developer' || 'Moderator')) return message.channel.send({ content: 'You are not allowed to use this.' });

		const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
		if (!user) {
			return message.channel.send(
				{ content:
          `**:x: | You did not mention a user, or you gave an invalid ID**`,
				},
			);
		}
		if (!args.slice(1).join(" ")) {return message.channel.send({ content: `:x: | You did not specify your message**` });}
		user.user
			.send(args.slice(1).join(" "))
			.catch(() => message.channel.send({ content: `**:x: | That user could not be DMed.**` }))
			.then(() => message.channel.send({ content: `**<:c_verified:941623165682057276> | Sent a message to ${user.user.tag}**` }));
	},
};