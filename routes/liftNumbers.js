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
    Name: req.body.Workout,
    daysPerWeek: req.body.Days
  })

  let splitArr = Object.keys(req.body.split);
  for(let i = 0; i < splitArr.length; i++){
    lift.split.push({
      Day: splitArr[i]
    })

    let exerciseArr = req.body.split[splitArr[i]]
    for(let j = 0; j < exerciseArr.length; j++){
      lift.split[i].Exercises.push({
        Exercise: exerciseArr[j].Exercise
      })
      if(exerciseArr[j].Sets != null){
        lift.split[i].Exercises[j].Sets = exerciseArr[j].Sets;
      }
      if(exerciseArr[j].Reps != null){
        lift.split[i].Exercises[j].Reps = exerciseArr[j].Reps;
      }
      if(exerciseArr[j].Weight != null){
        lift.split[i].Exercises[j].Weight = exerciseArr[j].Weight;
      }
    }
  }

  try {
    const newLift = await lift.save()
    res.status(202).json(newLift);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
})

//Update workout
router.patch('/:id', getExercise, async (req, res) => {
  if(req.body.Name != null){
    res.exercise.Name = req.body.Name;
  }
  if(req.body.Days != null){
    res.exercise.Days = req.body.Days;
  }
  try{
    const updatedLift = await res.exercise.save();
    res.json(updatedLift);
  } catch(err){
    res.status(400).json({message: err.message});
  }
})

//Update exercise given day and exercise _id
router.patch('/:id/:day', getExercise, async (req, res) => {
  let day;
  for(let i = 0; i < res.exercise.split.length; i++){
    if(res.exercise.split[i].Day == req.params.day){
      day = res.exercise.split[i];
      break;
    }
  }
  
  if(req.body._id == null){
    res.status(404).json({message : "Must provide exercise _id field"});
  }
  else{
    let exercise;
    for(let i = 0; i < day.Exercises.length; i++){
      if(req.body._id == day.Exercises[i]._id){
        exercise = day.Exercises[i];
        break;
      }
    }
    if(exercise == null){
      res.status(404).json({message : "Exercise not found"});
    }

    if(req.body.Exercise != null){
      exercise.Exercise = req.body.Exercise;
    }
    if(req.body.Sets != null){
      exercise.Sets = req.body.Sets;
    }
    if(req.body.Reps != null){
      exercise.Reps = req.body.Reps;
    }
    if(req.body.Weight != null){
      exercise.Weight = req.body.Weight;
    }

    try{
      const updatedLift = await res.exercise.save();
      res.json(updatedLift);
    } catch(err){
      res.status(400).json({message: err.message});
    }
  }
})

//Delete one workout
router.delete('/:id', getExercise, async (req, res) => {
  try {
    await res.exercise.deleteOne();
    res.json({message: "Deleted workout"});
  } catch(err){
    res.status(500).json({message: err.message});
  }
})

//Delete one exercise given day and workout id
router.delete('/:id/:day', getExercise, async (req, res) =>{
  let day;
  for(let i = 0; i < res.exercise.split.length; i++){
    if(res.exercise.split[i].Day == req.params.day){
      day = res.exercise.split[i];
      break;
    }
  }
if(day == null){
  return res.status(404).json({message: "Can't find day"});
}
if(req.body._id == null){
  return res.status(404).json({message: "Must provide exercise id"});
}

for(let i = 0; i < day.Exercises.length; i++){
  if(day.Exercises[i]._id == req.body._id){
    day.Exercises.splice(i,1);
    break;
  }
}

try{
  const updatedLift = await res.exercise.save();
  res.json("Deleted exercise");
} catch(err){
  res.status(400).json({message: err.message});
}

})

async function getExercise(req, res, next){
  let exercise;
  try {
    exercise = await liftNumbers.findById(req.params.id);
    if(exercise == null){
      return res.status(404).json({message: "Can't find workout"});
    }
  } catch (err){
    return res.status(500).json({message: err.message});
  }

  res.exercise = exercise;
  next();
}

module.exports = router;