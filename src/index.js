import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.end("Hello, world");
});

app.listen(8080, () => console.log("Server running on port 8080"));
