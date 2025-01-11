const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URI);
      console.log('DB Connected...');
    } catch (error) {
      console.error('DB Connection Failed:', error.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;
  