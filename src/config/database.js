const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://atydev:strongPassword123@cluster0.iv9cxfp.mongodb.net/?appName=Cluster0");
};

// connectDB()
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
//   });

module.exports = connectDB;