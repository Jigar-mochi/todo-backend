const express = require("express");
const cors = require('cors');
const connectDb = require("./src/config/dbConnection");
const errorHandler = require("./src/middleWare/errorHandler");
const validateTokenHandler = require("./src/middleWare/ValidateTokenHandler");
require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", require("./src/routes/userRoutes"));
app.use(errorHandler);
app.use(validateTokenHandler);

app.listen(port, () => {
	console.log(`server running on ${port}`);
});
