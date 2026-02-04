const express = require('express');
const router = express.Router();
const Booking =  require('../models/Booking');
const auth = require('../middleware/auth');

// Create a new booking
router.post('/', auth, async (req, res) => {
    try {
      const {listingId, checkIn, checkOut} = req.body;
      const booking = new Booking({
        listingId,
        userId : req.user.id, 
        checkIn,
        checkOut
      });
       await booking.save();
       res.status(201).json(booking)
    } catch (err) {
       res.status(500).json({message : "Error Creating Booking"})
    }
})

