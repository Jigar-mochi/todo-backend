const express = require("express");
const {
	getUser,
	registerUser,
	loginUser,
} = require("../controllers/userController");
const validateTokenHandler = require("../middleWare/ValidateTokenHandler");

const router = express.Router();

router.get("/currentUser", validateTokenHandler, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
