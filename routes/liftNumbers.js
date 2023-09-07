const express = require("express");
const router = express.Router();
const liftNumbers = require('../models/liftNumbersModel');
 
//Get all lifts
router.get('/', async (req, res) => {
  try {
    const lifts = await liftNumbers.find();
    res.json(lifts);
  } catch(err) {
    res.status(500).json({message: err.message });
  }
})

//Get one lift
router.get('/:id', getExercise, (req, res) => {
  res.send(res.exercise);
})

//Create one lift
router.post('/', async (req, res) => {
  const lift = new liftNumbers({
    Exercise: req.body.Exercise,
    Weight: req.body.Weight
  })
  try {
    const newLift = await lift.save()
    res.status(202).json(newLift);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
})

//Update one lift
router.patch('/:id', getExercise, async (req, res) => {
  if(req.body.Exercise != null){
    res.exercise.Exercise = req.body.Exercise;
  }
  if(req.body.Weight != null){
    res.exercise.Weight = req.body.Weight;
  }
  try{
    const updatedLift = await res.exercise.save();
    res.json(updatedLift);
  } catch(err){
    res.status(400).json({message: err.message});
  }
})

//Delete one lift
router.delete('/:id', getExercise, async (req, res) => {
  try {
    await res.exercise.deleteOne();
    res.json({message: "Deleted exercise"});
  } catch(err){
    res.status(500).json({message: err.message});
  }
})

async function getExercise(req, res, next){
  let exercise;
  try {
    exercise = await liftNumbers.findById(req.params.id);
    if(exercise == null){
      return res.status(404).json({message: "Can't find exercise"});
    }
  } catch (err){
    return res.status(500).json({message: err.message});
  }

  res.exercise = exercise;
  next();
}

module.exports = router;