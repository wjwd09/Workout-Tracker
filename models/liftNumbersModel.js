const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liftNumbersSchema = new Schema({
    Exercise: {
        type: String,
        required: true
    },
    Sets: {
        type: String
    },
    Reps: {
        type: String
    },
    Weight: {
        type: String,
        default: 0
    }
});

const workoutSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unqiue: true
    },
    daysPerWeek: {
        type: String,
        required: true
    },
    split : [{
        Day: {
        type: String,
        required: true
        },
        Exercises: [liftNumbersSchema]
    }]
});



module.exports = mongoose.model("liftNumbersModel", workoutSchema);