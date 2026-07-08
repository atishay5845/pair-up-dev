const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req,res,next)=>{
    //middleware to read the token from req cookie
    try{
    const token = req.cookies.token;
    if(!token){
        throw new Error("No token provided");
    }
    const decodedObj = await jwt.verify(token, "aty123");
    const id = decodedObj.userId;

  //validate the token
  const user  = await User.findById(id);
  if(!user){
    throw new Error("User not found");
  }
  req.user = user; // Attach the user object to the request for further use
  next();
}catch(err){
    res.status(400).send("Unauthorized: " + err.message);
}

//find the user in the database
};

module.exports = {
    userAuth
};