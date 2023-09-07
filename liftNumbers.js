const express = require("express");
const router = express.Router()

router.get('/', function(req, res){
    console.log("liftNumbers GET!");
    res.send("This is where lift numbers go");
})

module.exports = router;