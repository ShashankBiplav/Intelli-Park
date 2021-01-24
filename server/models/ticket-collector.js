import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ticketCollectorSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean,
    default: false
  },
  otp:{
    type: Number,
  },
},{
  timestamps: true
});

export default mongoose.model('TicketCollector', ticketCollectorSchema);
