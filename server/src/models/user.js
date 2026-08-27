const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtExpiresIn, jwtSecret } = require("../config/env");

const userSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    min: 18,
  }
  , gender: {
    type: String,
    //custome validation 
    validate: {
      validator: function (v) {
        return /^(male|female|other)$/.test(v);
      },
      message: 'Please enter a valid gender'
    }
  },
  photoUrl: {
    type: String
  },
  about: {
    type: String,
    default: "This is a default about me text. Please update your profile to add more information about yourself."
  },
  skills: {
    type: [String] // Array of strings
  },

}, {
  timestamps: true,
  toJSON: {
    transform: (_document, returnedObject) => {
      delete returnedObject.password;
      delete returnedObject.__v;
      return returnedObject;
    },
  },
});

userSchema.index({ firstName: 1 });

//method to generate JWT token for the user moongoose handler methods
userSchema.methods.getJWT = async function () {
  const token = jwt.sign({ userId: this._id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
  return token;
}

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
}
//create mongoose model
const User = mongoose.model("User", userSchema);
module.exports = User;
