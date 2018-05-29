const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

//TODO: add uniqueness and email validator
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    passwordHash: { type: String, required: true },
    comfirm: { type: Boolean, default: false }
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

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    comfirm: this.comfirm,
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: "This email has been taken!" });
module.exports = mongoose.model("User", schema);
