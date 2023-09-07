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

module.exports = mongoose.model("liftNumbersModel", liftNumbersSchema);