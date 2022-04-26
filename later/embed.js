const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "embed",
	aliases: ['e'],
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, message) => {
		const embed = new MessageEmbed()
			.setTitle('Channel Information')
			.addField('Verification', '<#934404709631025152> - Only unverified users can see this role. They shall do `/whitelist add {username}` in order to get whitelisted')
			.addField('Introduction', '<#934397378084093952> - Self explanatory; welcomes people who are new to the server.\n<#934391868773507102> - Shows all rules including Minecraft SMP rules. By verifying, you agree to the rules.\n<#934392726680649788> - Gives you a role depending on what you react to')
			.addField('Information', '<#934397632682532934> - All the announcements including the team and the SMP will be shown here.\n\n<#934415399511011409> - All the updates regarding the SMP will be reported here.\n\n<#937772178840100964> - Report a bug/exploit here. If your bug is real, it will be put in <#934392165373710436> and it will show the status of the bug.\n\n<#937271973665439784> - All our social updates like new Tweets and YouTube videos will be sent here.\n\n<#934392165373710436> - Shows all the known bugs observed by the SMP Staff and the community\n\n<#935937263865585724> - Shows SMP server information and what you need to know about it.\n\n<#934398034895315004> - Shows all the new events.\n\n<#939856378950979644> - Polls regarding the SMP are posted here. In order to get notified whether there is a new role or not, go to <#934392726680649788> and react.');
		message.channel.send({ embeds: [embed] });
	},
};
