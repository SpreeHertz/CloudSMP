/* eslint-disable no-unused-vars */
const { glob } = require("glob");
const { promisify } = require("util");
const mongoose = require("mongoose");
const config = require('../config.json');
const chalk = require('chalk');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	// Commands
	const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
	commandFiles.map((value) => {
		const file = require(value);
		const splitted = value.split("/");
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
	});

	// Events
	const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(
		`${process.cwd()}/SlashCommands/*/*.js`,
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);

		if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	});
	client.on("ready", async () => {
		// Register slash commands (single-guild method)
		const guild = await client.guilds.cache.get(config.guildId).commands.set(arrayOfSlashCommands);
	});

	// mongoos
	if (!process.env.database) return console.log(chalk.red('No mongoose connection string specified.'));

	mongoose.connect(process.env.database).then(() => console.log('Connected to MongoDB'));
};
