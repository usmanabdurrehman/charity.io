let mongoose = require('mongoose')

const User = new mongoose.Schema({
  fname:String,
  lname:String,
  pwd:String,
  email:String,
  profileImg:String,
  role:String
});

module.exports = mongoose.model('User',User)
