const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req , res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
})