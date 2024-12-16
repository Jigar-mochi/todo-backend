const express = require("express");
const cors = require('cors');
const connectDb = require("./src/config/dbConnection");
const errorHandler = require("./src/middleWare/errorHandler");
require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/notes", require("./src/routes/notesRoutes"));
app.use(errorHandler);

app.listen(port, () => {
	console.log(`server running on ${port}`);
});
