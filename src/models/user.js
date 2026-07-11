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
//method to generate JWT token for the user moongoose handler methods
userSchema.methods.getJWT = async function() {
  const user = this; // 'this' refers to the user document instance
  const token = await jwt.sign({ userId: this._id }, "aty123", {
    expiresIn: "1h" // Set the token expiration time to 1 hour
  });
  return token;
}

userSchema.methods.validatePassword = async function(password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
}
//create mongoose model
const User = moongoose.model("User", userSchema);//
module.exports = User;