const { Schema, model } = require("mongoose");

module.exports = model(
	"userinfo",
	new Schema({
		MinecraftIGN: String,
		Twitter: String,
		YouTube: String,
		Remarks: String,
		UserId: String,
	}),
);