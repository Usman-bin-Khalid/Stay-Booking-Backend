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


// Get All Bookings
router.get('/my-bookings' , auth, async (req, res) => {
    try  {
     const bookings = await Booking.find({userId : req.user.id}).populate("listingId");
     res.json(bookings);

    } catch (err) {
      res.status(500).json({message : "Error Fetching Bookings"});
    }
})

// Get a Single booking by there id
router.get('/:id' , auth, async (req, res) => {
 try {
   const booking = await Booking.findById(req.params.id).populate("listingId");
   if(!booking) return res.status(404).json({message : "Booking not found"});
   if(booking.userId.toString() !== req.user.id) return res.status(403).json({message : "Unauthorized"});
   res.json(booking); 
 } catch (err) {
   res.status(500).json({message : "Server Error"});
 }
});

// Update the booking

router.put('/:id' ,auth,  async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).json({message : "Booking not found"});
    if (booking.userId.toString() !== req.user.id) return res.status(403).json({message : "Unauthorized"});
    const {checkIn, checkOut} = req.body;
    booking.checkIn = checkIn || booking.checkIn;
    booking.checkOut = checkOut || booking.checkOut;
    await booking.save();
    res.json(booking); 
  } catch (err) {
     res.status(500).json({message : "Error Updating Booking"});
  }
})
module.exports = router;

