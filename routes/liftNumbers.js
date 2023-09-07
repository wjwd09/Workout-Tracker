const express = require("express");
const router = express.Router();
const liftNumbers = require('../models/liftNumbersModel');
 
//Get all lifts
router.get('/', (req, res) => {
  res.send('Hello World')
})

//Get one lift
router.get('/:id', (req, res) => {
  res.send(req.params.id)
})

//Create one lift
router.post('/', (req, res) => {

})

//Update one lift
router.patch('/:id', (req, res) => {

})

//Delete one luft
router.delete('/:id', (req, res) => {

})
module.exports = router;