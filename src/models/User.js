const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//TODO: add uniqueness and email validator
const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

schema.methods.generateJWT = function() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRECT_KEY
  );
};

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("User", schema);
