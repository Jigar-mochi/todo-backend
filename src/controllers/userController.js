const auth = require("../models/authSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUserSchema } = require("../utils/validations");

const getUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

const loginUser = asyncHandler(async (req, res) => {
	const { userName, password } = req.body;
	if (!userName || !password) {
		res.status(400).json({ success: false, message: 'Required data is missing..' });;
	}
	const user = await auth.findOne({ userName });

	if (user && (await bcrypt.compare(password, user.password))) {
		const accessToken = await jwt.sign(
			{
				id: user._id,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);
		console.log("accessToken", accessToken);
		res.status(200).json({ success: true, message: 'User logged in successfully.', data: { authToken: accessToken } });
	} else {
		res.status(400).json({ success: false, message: "Email or password is wrong" });
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { fullName, userName, email, password } = req.body;
	try {
		await registerUserSchema.validate(req.body, { abortEarly: false });
	} catch (err) {
		return res.status(400).json({ success: false, errors: err.errors });
	}
	// Check if user already exists
	const userAvailable = await auth.findOne({ email });
	if (userAvailable) {
		return res.status(400).json({ success: false, message: "User already registered." });
	}
	// Hash password
	const saltRounds = 10; // Consider making this configurable
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	// Create new user
	const user = await auth.create({
		fullName,
		userName,
		email,
		password: hashedPassword,
	});
	const accessToken = await jwt.sign(
		{
			id: user._id,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "1d" }
	);
	if (user) {
		return res.status(201).json({ success: true, message: 'User registered successfully', data: { accessToken, user } });
	} else {
		return res.status(400).json({ success: false, message: "Failed to register user" });
	}
});

module.exports = {
	getUser,
	registerUser,
	loginUser,
};
