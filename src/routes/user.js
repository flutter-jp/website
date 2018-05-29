const User = require("../models/User.js");
const parseErrors = require("../utils/parseErrors").parseErrors;

exports.signup = (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });

  user.setPassword(password);
  user
    .save()
    .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
};
