const express = require('express');
// require('./config/database'); // Ensure the database connection is established
const connectDB = require('./config/database');
const User = require('./models/user'); // Import the User model
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/signup', async (req, res) => {
  const user = new User(req.body); // Create a new user instance using the User model
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Error creating user");
  }
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

