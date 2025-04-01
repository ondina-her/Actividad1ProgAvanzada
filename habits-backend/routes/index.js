var express = require('express');
var router = express.Router();
const Habit = require('../models/Habit');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Ensure jwt is imported

/* GET home page. */
const authenticateToken = (req, res, next) => {
  const token = req.headers['Authorization'];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habits', authenticateToken, async (req, res) => {
 try {
  let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({ message: "Error retrieving habits" });
  
  const habits = await Habit.find({ 'userId': new mongoose.Types.ObjectId(userId)});
    
  res.json(habits);
  }
  catch (err) {
    res.status(500).json({ message: "Error retrieving habits" });
  }
});

router.post('/habits', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({ message: "Error adding habits" });
    userId = new mongoose.Types.ObjectId(userId);
    const habit = new Habit({ title, description, userId });
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(400).json({ message: "Error creating habit" });
  }
});

router.delete('/habits/:id', authenticateToken, async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Habit not found' });
  }
});

router.patch('/habits/markasdone/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    habit.lastDone = new Date();
    if (timeDifferenceInHours(habit.lastDone, habit.lastUpdated) < 24) {
      habit.lastUpdated = new Date();
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedAt);
      await habit.save();
      res.status(200).json({ message: 'Habit marked as done!' });
    } else {
      habit.days = 1;
      habit.lastUpdated = new Date();
      habit.startedAt = new Date();
      await habit.save();
      res.status(200).json({ message: 'Habit restarted!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating habit' });
  }
});

const timeDifferenceInHours = (date1, date2) => {
  const diffnceMS = Math.abs(date1 - date2);
  return diffnceMS / (1000 * 60 * 60);
};

const timeDifferenceInDays = (date1, date2) => {
  const diffnceMS = Math.abs(date1 - date2);
  return Math.floor(diffnceMS / (1000 * 60 * 60 * 24));
};

module.exports = router;
//20010878  VpUQReBIx5U8n0tc