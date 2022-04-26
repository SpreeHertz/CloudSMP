/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Returns websocket ping",
	type: 'CHAT_INPUT',
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction, args) => {
		const embed = new MessageEmbed()
			.setDescription(`Pong! ${client.ws.ping}ms`)
			.setColor('RANDOM');
		interaction.followUp({ embeds: [embed] });
	},
};
