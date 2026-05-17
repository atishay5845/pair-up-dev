const express = require('express');
// require('./config/database'); // Ensure the database connection is established
const connectDB = require('./config/database');
const User = require('./models/user'); // Import the User model
const app = express();

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

  //we will use post method to create a user
  app.post('/signup', (req, res) => {
    const userObj={
        firstName: "Atishay",
        lastName: "Sodhiya",
        email: "atydev@email.com",
        password: "strongPassword123"
    }

    const user = new User(userObj); // Create a new user instance using the User model
    
  })

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

