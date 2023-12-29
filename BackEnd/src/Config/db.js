// src/config/db.js
const mongoose = require('mongoose');
  async function connectDB() {
    const url = "mongodb://127.0.0.1/abs";
    try {
      await mongoose.connect(url, {
      });
  
      console.log(`Database connected: ${url}`);
    } catch (error) {
      console.error(`Error connecting to the database: ${error.message}`);
      process.exit(1);
    }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
}

module.exports = connectDB;
