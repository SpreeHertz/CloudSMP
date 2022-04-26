const client = require("../index");
const chalk = require("chalk");
const config = require("../config.json");
const fetch = require('node-fetch');
const ms = require('ms');
const Discord = require('discord.js');

client.on('ready', async () => {
	console.log(chalk.blueBright(`${client.user.tag} is up and ready to go!`));
	client.user.setActivity('the Discord server', { type: 'WATCHING' });
	const updateChannel = async () => {

		// Fetch statistics from mcapi.us
		const res = await fetch(`https://mcapi.us/server/status?ip=${config.ipAddress}${config.port ? `&port=${config.port}` : ''}`);
		if (!res) {
			const statusChannelName = `【🛡】Status: Offline`;
			client.channels.cache.get(config.statusChannel).setName(statusChannelName);
			return false;
		}
		// Parse the mcapi.us response
		const body = await res.json();

		// Get the current player count, or set it to 0
		const players = body.players.now;

		// Get the server status
		const status = (body.online ? "Online" : "Offline");

		// Generate channel names
		const playersChannelName = `【👥】Players: ${players}`;
		const statusChannelName = `【🛡】Status: ${status}`;

		// Update channel names
		client.channels.cache.get(config.playersChannel).setName(playersChannelName);
		client.channels.cache.get(config.statusChannel).setName(statusChannelName);

		return true;
	};

	setInterval(() => {
		updateChannel();
	}, ms(config.updateInterval));


	client.on('messageCreate', async (message) => {

		if (message.content === `${config.prefix}force-update`) {
			if (!message.member.permissions.has('MANAGE_MESSAGES')) {
				return message.channel.send('Only server moderators can run this command!');
			}
			const sentMessage = await message.channel.send("Updating the channels, please wait...");
			await updateChannel();
			sentMessage.edit("Channels were updated successfully!");
		}

		if (message.content === `${config.prefix}stats`) {

			// Fetch statistics from mcapi.us
			const res = await fetch(`https://mcapi.us/server/status?ip=${config.ipAddress}${config.port ? `&port=${config.port}` : ''}`);
			if (!res) return message.channel.send(`Looks like your server is not reachable... Please verify it's online and it isn't blocking access!`);
			// Parse the mcapi.us response
			const body = await res.json();

			const embed = new Discord.MessageEmbed()
				.setAuthor(config.ipAddress)
				.addField("Version", body.server.name)
				.addField("Connected", `${body.players.now} players`)
				.addField("Maximum", `${body.players.max} players`)
				.addField("Status", (body.online ? "Online" : "Offline"))
				.setColor("RANDOM");

			message.channel.send({ content: `:chart_with_upwards_trend: Here are the stats for **${config.ipAddress}**:`, embeds: [embed] });
		}

	});
});

