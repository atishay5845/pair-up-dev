const moongoose = require("mongoose");

const userSchema = new moongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age:{
    type: Number,
    required: true,
  }
})

//create mongoose model

const User = moongoose.model("User", userSchema);//
module.exports = User;