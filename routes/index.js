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

module.exports = router;

//20010878  VpUQReBIx5U8n0tc
