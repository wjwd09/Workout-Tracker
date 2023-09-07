const express = require("express");
const liftNumbers = require("./liftNumbers.js");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", function (req, res) {
    console.log("GET request!");
    res.send("Hello World!");
});

module.exports = app;

app.use("/liftNumbers", liftNumbers);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

const mongoose = require("mongoose");

//setting up mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workoutapp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if(err){
        console.log(err);
      }
      else {
        console.log("Connected to MonogDB");
      }
    }
);
