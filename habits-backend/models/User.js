const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Ensure passwords have a minimum length
    },
    email: {
        type: String,
        unique: true, // Ensure emails are unique
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
        sparse: true // Allows null values for optional email
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define allowed roles
        default: 'user'
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);