const express = require("express");
const liftNumbers = require("./liftNumbers.js");
const app = express();
const port = 3000;
const connectToMongo = require("./db.js");

app.use(express.json());

app.get("/", function (req, res) {
    console.log("GET request!");
    res.send("Hello World!");
});

module.exports = app;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

connectToMongo();
const blogRouter = require("./routes/BlogRoutes.js");

app.use("/api/blogs", blogRouter)
