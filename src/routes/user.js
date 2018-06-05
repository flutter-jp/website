const express = require("express");
const User = require("../models/User.js");
const parseErrors = require("../utils/parseErrors").parseErrors;
const sendConfirmationEmail = require("../mailer.js").sendConfirmationEmail;
const sendResetPasswordEmail = require("../mailer.js").sendResetPasswordEmail;
const authorizate = require("../utils/authorizate").authorizate;

// app.post("/api/user", user.signup);
// app.post("/api/user/reset_password_request", user.resetPasswordRequest);
// app.get("/api/users/current_user", user.fetchUser);

const router = express.Router();

router.get("/current_user", authorizate, (req, res) => {
  res.json({
    user: {
      email: req.currentUser.email,
      confirm: req.currentUser.confirm
    }
  });
});

router.post("/user", (req, res) => {
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
});

router.post("/reset_password_request", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      res.status(400).json({ errors: { globals: "User does't exits!" } });
    }
  });
});

module.exports = router;
