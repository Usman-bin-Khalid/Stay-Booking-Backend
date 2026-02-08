const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('../routes/auth');
const profileRoutes = require('../routes/profile');
const listingRoutes = require('../routes/listing');
const bookingRoutes = require('../routes/bookings');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB connection (safe for Vercel)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// ✅ EXPORT — DO NOT LISTEN
module.exports = app;
