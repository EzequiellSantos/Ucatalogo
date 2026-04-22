require('dotenv').config();
const mongoose = require('mongoose');

let cachedConnection = null;

const connectToDatabase = async () => {
  if (cachedConnection || mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured.');
  }

  cachedConnection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000
  });

  return cachedConnection;
};

module.exports = {
  connectToDatabase
};
