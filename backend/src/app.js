require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000'].filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json({ limit: '5mb' }));

app.get('/api/health', async (_req, res, next) => {
  try {
    await connectToDatabase();
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.use('/api/auth', authRouter);

app.use('/api/products', async (_req, _res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/products', productsRouter);

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid product id.' });
  }

  return res.status(500).json({ message: error.message || 'Internal server error.' });
});

module.exports = app;
