const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:3000/";

const connectToMongo = async() => {
  try {
    mongoose.set("strictQuery",false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch(error){
    console.log(error)
  }
};

module.exports = connectToMongo;