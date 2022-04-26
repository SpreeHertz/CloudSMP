module.exports = {
	name: "ping",
	aliases: ['p'],
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, message) => {
		message.channel.send(`Websocket Ping: \`${client.ws.ping}\`ms`);
	},
};
