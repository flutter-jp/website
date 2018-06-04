const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authorizate = (req, res, next) => {
  const header = req.headers.authorization;
  if (header) {
    token = header.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRECT_KEY, (err, decoded) => {
        if (err) {
          res.status(401).json({ errors: { global: "Invalid token" } });
        } else {
          User.findOne({ email: decoded.email }).then(user => {
            req.currentUser = user;
            next();
          });
        }
      });
    } else {
      res.statue(401).json({ errors: { global: "No token" } });
    }
  } else {
    res.status(401).json({ errors: { global: "Without authorization!" } });
  }
};
