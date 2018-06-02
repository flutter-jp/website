const express = require("express");
const router = express.Router();

router.get("/search", (req, res) => {
  res.json({ success: true });
});

module.exports = router;
