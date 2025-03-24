var express = require('express');
var router = express.Router();
const Habit = require('../models/Habit');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habits', async (req, res) => {
  try{
    const habits = await Habit.find();
    res.json({habits });
  }catch(err){
    res.status(500).json({message:"Error retrieving habits"})
  }
  
});

router.post('/habits',async function (req,res) {
  
    const { title, description} = req.body;
    const habit = new Habit({title, description});
    await habit.save();
    res.json(habit); 
});

router.delete('/habits/:id',async(req,res)=>{
  try{
    await habit.bindByIdAndDelete(req.params.id);
    res.json({message:'Habit Deleted'});
  }catch(err){
    res.status(500).json({message:'Habit not found'});
  }
  
})

router.patch('/habits/markasdone/:id',async(req,res)=>{
  try{
    const habit = await Habit.findById(req.params.id);
    habit.lastDone = new Date();
    if(timeDifferenceInHours(habit.lastDone, habit.lastUpdated) < 24){
      habit.lastUpdated = new Date();
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedAt);
      habit.save();
      res.status(200).json({message:'Habit maked as done!'});
    }else{
      habit.days = 1;
      habit.lastUpdated = new Date();
      habit.startedAt = new Date();
      habit.save();
      res.status(200).json({message:'Habit restarted!'});
    }
  }catch(err){
    res.status(500).json({message:'Error updating habit'});
  }
});

const timeDifferenceInHours = (date1, date2) => {
  const diffnceMS = Math.abs(date1 - date2);
  return diffnceMS/(1000*60*60);
}

const timeDifferenceInDays = (date1, date2) => {
  const diffnceMS = Math.abs(date1 - date2);
  return Math.floor(diffnceMS/(1000*60*60*24));

}

module.exports = router;
//20010878  VpUQReBIx5U8n0tc
