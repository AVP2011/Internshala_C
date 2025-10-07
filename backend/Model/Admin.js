// backend/models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }, // Stores the hashed password
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);

// NOTE: Before testing, ensure you have an Admin user in your database 
// with a password that has been BCRYPT-HASHED.