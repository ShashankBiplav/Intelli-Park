import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const parkingTicketSchema = new Schema({
  vehicleNumber:{
    type: String,
    required: true
  },
  vehicleType:{
    type: Number,
    default: 2
  },
  ownerPhone:{
    type: Number,
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
      ref: 'TicketCollector',
    },
    phone: {
      type: Number,
    },
    name:{
      type:String
    }
  },
  collectedBy:{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'TicketCollector',
      default: null
    },
    phone: {
      type: Number,
      default: null
    },
    name:{
      type: String,
      default: null
    }
  }
},{
  timestamps: true
});

export default mongoose.model('ParkingTicket', parkingTicketSchema);
