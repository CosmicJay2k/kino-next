import mongoose from "mongoose"; 

const paySchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  },
  cvc: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

let Pay;

try {
  Pay = mongoose.model('Pay');
} catch (error) {
  Pay = mongoose.model('Pay', paySchema); 
}

export default Pay;
