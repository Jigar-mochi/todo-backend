const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			require: [true, "Full name is required"],
		},
		userName: {
			type: String,
			unique: true,
			trim: true,
			require: [true, "Username is required"],
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			require: [true, "Username is required"],
		},
		password: {
			type: String,
			require: [true, "Password is required"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);
