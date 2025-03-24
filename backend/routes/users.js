var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',async function (req,res) {
  try{
    const { username, password} = req.body;
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new Habit({user, password:hashedPassword});
    await newuser.save();

    res.status(201).json({message:"User created"});
  } catch(err){
    res.status(500).json({err:"Error creating user", "description":err.toString()});
  } 

});

router.post('/login',async function (req,res,next) {
  try{
    const { username, password} = req.body;

    const user = await User.findOne({username});
    if(!user) return res.status(400).json({message:"User not found"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
      res.cookie('habitToken', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'Strict',
        maxAge: 7 * (24) * 60 * 60 * 1000, // 7 days
      });
      res.json({message:"User logged in", token});
  } catch(error){
    res.status(500).json({error:"Error logging in", "description":error.toString()});
  } 

});


module.exports = router;
