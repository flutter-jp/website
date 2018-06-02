const express = require("express");
const authorizate = require("../utils/authorizate").authorizate;
const router = express.Router();

router.get("/search", authorizate, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
