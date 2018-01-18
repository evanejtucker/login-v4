// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true  
  },
  password: {
    type: String,
    unique: false,
    required: true  
  },
  firstName: {
      type: String,
      unique: false,
      required: true
  },
  lastName: {
      type: String,
      unique: false,
      required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  photo: {
    type: String,
    unique: false,
    required: false  
  },
  administer: {
      trype: Boolean,
      unique: false,
      default: false,
  }
});


var User = mongoose.model("Users", UserSchema);

module.exports = User;