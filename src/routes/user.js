const User = require("../models/User.js");
const parseErrors = require("../utils/parseErrors").parseErrors;
const sendConfirmationEmail = require("../mailer.js").sendConfirmationEmail;

exports.signup = (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userRecord => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
};

exports.resetPass = (req, res) => {
  const { email, password, new_password } = req.body.credentials;
  User.findOne({ email: email })
    .then(user => {
      if (user && user.isValidPassword(password)) {
        user.setPassword(new_password);
        user.save().then(userRecord => {
          res.json({ user: userRecord.toAuthJSON() });
        });
      }
    })
    .catch(err => res.status(400).json({ errors: err }));
};
