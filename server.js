require('dotenv').config()

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to DB"));

app.use(express.json());

const liftNumbersRouter = require('./routes/liftNumbers');
app.use('/liftNumbers', liftNumbersRouter);

app.listen(port, function () {
  console.log(`Workout app listening on port ${port}!`);
});


module.exports = app;



