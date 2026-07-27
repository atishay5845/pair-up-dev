const express = require('express');
// require('./config/database'); // Ensure the database connection is established
const connectDB = require('./config/database');
const User = require('./models/user'); // Import the User model
const app = express();
const { validateSignupData } = require('./utils/validation'); // Import the validation 
const cookieParser = require('cookie-parser'); // Import cookie-parser middleware
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const { userAuth } = require('./middlewares/auth'); // Import the userAuth middleware
const cors = require("cors");

app.use(cors({
  origin:"http://localhost:5173", // white listing this domain
  credentials:true
}));
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies



app.post('/signup', async (req, res) => {
  //first validate the data
  try {
    validateSignupData(req); // Validate the incoming request data

    
    //then encrypt the password
    const {password, firstName, lastName, email, age} = req.body;
    const passwordHash = await bcrypt.hash(password, 10); 
    console.log("Password hash:", passwordHash); // Log the hashed password for debugging

    //then save the data to database
    // Create a new user instance using the User model
    // const user = new User(req.body); //very bad
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // Store the hashed password instead of the plain text
      age
    });

    await user.save(); // Save the user to the database
    res.send("User created successfully");

  }catch (error) {
    res.status(400).send(error.message); // Send a 400 Bad Request response with the error message
  }
  
});
app.post('/login', async (req, res) => {
    try{
      const { email, password } = req.body;

      
      const user = await User.findOne({ email: email }); // Find the user by email
      if (!user) {
        return res.status(404).send("User not found");
      }

      // const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
      const isPasswordValid = await user.validatePassword(password); // Use the validatePassword method to check the password
      if (isPasswordValid) {
        // const token = await jwt.sign({ userId: user._id },"aty123");
        const token = await user.getJWT(); // Use the getJWT method to generate the token
        console.log("Generated token:", token); // Log the generated token for debugging
        res.cookie("token", token , { httpOnly: true, maxAge: 3600000 }); // Set the token in an HTTP-only cookie with a 1-hour expiration for production use https: true, sameSite: 'Strict' });
        res.send(user);
      }else{
        throw new Error("Invalid password");
      }
    }catch(error){
        res.status(400).send(error.message);
    }
});
app.get('/profile',userAuth, async (req, res) => {
    try {
        const user = req.user;

        // Send profile data
        res.status(200).json({
            message: "Profile fetched successfully",
            profile: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(401).json({
            message: "Invalid or expired token."
        });
    }
});
//anyone can send connection request to anyone but if we add userAuth middleware then only logged in user can send connection request .
app.post('/sendConnectionRequest', async (req, res) => {
  console.log("sending connection request");
  res.send("Connection request sent successfully");
});
//fetching data from database
app.get('/user', async (req, res) => {
  const userEmail = req.query.email;
  try {
    // .find() always returns an array (e.g., [] or [{...}])
    const users = await User.find({ email: userEmail }); // This will return an array of users matching the email (could be empty if no match)
    // if we want obj then we can use findOne() which will return null if no user is found or the user object if found
    
    // This check is now safe and correct
    if (users.length === 0) {
      return res.status(404).send("User not found");
    } else {
      res.send(users); // Sends the array of users
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send("Error fetching user");
  }
});

app.get('/feed',async (req, res) => {
  try{
    const users = await User.find(); // Fetch all users from the database
    res.send(users); // Send the list of users as the response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send("Error fetching users");
  }
});

//delete api
app.delete('/delete-user', async (req, res) => {
  const userId = req.body.userId; 
  try {
    const user = await User.findByIdAndDelete(userId); 
    
    if (!user) {
      return res.status(404).send("User not found");
    }
    
    res.send("User deleted successfully");
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send("Error deleting user");
  }
});

//patch api update user
app.patch('/update-user', async (req, res) => {
  const userId = req.body.userId;
  const data = req.body; // Expecting an object with the fields to update
  try {
    // await User.findByIdAndUpdate(userId,data);// This will update the user with the provided data
      const user = await User.findByIdAndUpdate(userId, data,
         { new: true ,
          runValidators: true,
          returnDocument: 'after' // This option ensures that the updated document is returned

         }); // This will return the updated user document
    res.send("User updated successfully");
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send("Error updating user");
  }
});

//update certain fields of user only 
app.patch('/update-certain', async (req, res) => {
  const userId = req.body.userId;
  const data = req.body; // Expecting an object with the fields to update

  const allowedUpdates = [ , "age", "gender", "photoUrl", "about", "skills"]; // Define which fields are allowed to be updated


  const isUpdateAllowed = Object.keys(data).every((key) => allowedUpdates.includes(key));

  if(!isUpdateAllowed){
    return res.send("Invalid updates! You can only update age, gender, photoUrl, about, and skills.");
  }
  try {
      const user = await User.findByIdAndUpdate(userId, data,
         { new: true ,
          runValidators: true,
          returnDocument: 'after' // This option ensures that the updated document is returned

         }); // This will return the updated user document
    res.send("User updated successfully");
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send("Error updating user");
  }
});

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

  //fetch json data from api postman
  // app.post("/signup", async (req, res) => {
  //   console.log(req.body); // Log the request body to see the incoming data
  // }); //it will give undefined because we have not used express.json() middleware to parse the incoming JSON data

  //we will use post method to create a user
  // app.post('/signup', async (req, res) => {
  //   const userObj={
  //       firstName: "MS",
  //       lastName: "Dhoni",
  //       email: "msdhoni@email.com",
  //       password: "strongPassword123",
  //       age: 25
  //   }
  
    

  //   const user = new User(userObj); // Create a new user instance using the User model
  //   try{
  //     await user.save(); // Save the user to the database
  //     res.send("User created successfully");
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     res.status(500).send("Error creating user");
  //   }
  // })

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

