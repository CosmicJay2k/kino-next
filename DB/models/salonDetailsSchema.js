import mongoose from "mongoose";

const salonDetailsSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

const SalonDetails = mongoose.model('SalonDetails', salonDetailsSchema);

export default SalonDetails;