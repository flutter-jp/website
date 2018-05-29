const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Promise = require("bluebird");

const auth = require("./routes/auth");
const user = require("./routes/user");

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.Promise = Promise;

mongoose.connection.on("open", ref => {
  console.log("Connect to mongo server");
});

mongoose.connection.on("error", err => {
  console.log("errors happens");
});

mongoose.connect(process.env.MONGDB_URI);

app.post("/api/auth", auth.login);
app.post("/api/user", user.signup);

app.listen(8080, () => console.log("Server running on port 8080"));
