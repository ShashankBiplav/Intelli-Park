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
  amount:{
    type: Number,
    required: true
  },
  ticketCollector:{
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
