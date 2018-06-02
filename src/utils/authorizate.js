const jwt = require("jsonwebtoken");

exports.authorizate = (req, res, next) => {
  const header = req.headers.authorization;
  if (header) token = header.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRECT_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        //TODO: check the db for verify the user
        req.userEmail = decoded.email;
        next();
      }
    });
  } else {
    res.statue(401).json({ errors: { global: "No token" } });
  }
};
