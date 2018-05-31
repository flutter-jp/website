const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = function(req, res) {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid Credentials" } });
    }
  });
};

exports.confirm = (req, res) => {
  const { token } = req.body;
  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirm: true, confirmationToken: "" },
    { new: true }
  )
    .then(
      user =>
        user
          ? res.json(user.toAuthJSON())
          : res.status(400).json({ errors: "User does not exist" })
    )
    .catch(err => {
      res.status(400).json({});
    });
};

exports.validateToken = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRECT_KEY, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
};

exports.resetPassword = (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRECT_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid token" } });
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res.status(401).json({ errors: { global: "Invalid token" } });
        }
      });
    }
  });
};
