const validator = require("validator");//it is a library that provides a set of string validation and sanitization functions. It can be used to validate email addresses, URLs, and other types of input data. It can also be used to sanitize input data by removing unwanted characters or formatting it in a specific way.
const validateSignupData = (req) => {
  const {firstName, lastName, email, password, age} = req.body;
  if(!firstName || !lastName || !email || !password){
    throw new Error("All fields are required");
  }else if(!validator.isEmail(email)){                            
    throw new Error("Invalid email address");
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not strong enough. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.");
  }else if (age !== undefined && (!Number.isInteger(age) || age < 18)) {
    throw new Error("Age must be a whole number of at least 18");
  }
};

const validateLoginData = (req) => {
  const { email, password } = req.body;
  if (!email || !password || !validator.isEmail(email)) {
    throw new Error("A valid email and password are required");
  }
};
module.exports = { validateSignupData, validateLoginData };

