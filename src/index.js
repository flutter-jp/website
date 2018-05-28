const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const auth = require("./routes/auth");

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connection.on("open", ref => {
  console.log("Connect to mongo server");
});

mongoose.connection.on("error", err => {
  console.log("errors happens");
});

mongoose.connect(process.env.MONGDB_URI);

app.post("/api/auth", auth.login);

app.listen(8080, () => console.log("Server running on port 8080"));
