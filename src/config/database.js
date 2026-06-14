const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://atydev:atydev123@cluster0.iv9cxfp.mongodb.net/"
  );
};

module.exports = connectDB;