const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.CONNECTION_STRING);
		console.log("connected", connect.Collection);
	} catch (error) {
		console.error("error", error);
	}
};

module.exports = connectDb;
