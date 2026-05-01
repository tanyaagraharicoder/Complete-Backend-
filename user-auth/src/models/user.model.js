const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userSchema:String,
    email:String,
    password:String,
    
})

const userModel= mongoose.model('user',userSchema);

module.exports = userModel;