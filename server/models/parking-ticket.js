import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const parkingTicketSchema = new Schema({
  vehicleNumber:{
    type: String,
    required: true
  },
  startingTime:{
    type: Date,
    required: true
  },
  endingTime:{
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  amount:{
    type: Number,
    default: 0
  },
  isAmountCollected:{
    type: Boolean,
    default: false
  },
  createdBy:{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'TicketCollector'
    },
    name: {
      type: String,
      required: true
    },
  },
  collectedBy:{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'TicketCollector'
    },
    name: {
      type: String,
      required: true
    },
  }
},{
  timestamps: true
});

export default mongoose.model('ParkingTicket', parkingTicketSchema);
