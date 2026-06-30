const moongoose = require("mongoose");

const userSchema = new moongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 4
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 4
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age:{
    type: Number,
    required: true,
  }
  ,gender:{
    type: String,
    //custome validation 
    validate: {
      validator: function(v) {
        return /^(male|female|other)$/.test(v);
      },
      message: 'Please enter a valid gender'
    }
  },
  photoUrl:{
    type: String
  },
  about:{
    type: String,
    default: "This is a default about me text. Please update your profile to add more information about yourself."
  },
  skills:{
    type: [String] // Array of strings
  },

},{
  timestamps: true // This will automatically add createdAt and updatedAt fields
})

//create mongoose model

const User = moongoose.model("User", userSchema);//
module.exports = User;