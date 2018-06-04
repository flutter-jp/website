const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  covers: { type: String, required: true },
  goodreadsId: { type: Number },
  page: { type: Number },
  userId: { type: mongoose.Schema.ObjectId, required: true }
});

module.exports = mongoose.model("Book", schema);
