import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const minimumRequirementsSchema = new Schema({
  min2WheelerHourly:{
    type: Number,
    default: 10
  },
  min2WheelerPerMinute:{
    type: Number,
    default: 0.1
  },
  min4WheelerHourly:{
    type: Number,
    default: 25
  },
  min4WheelerPerMinute:{
    type: Number,
    default: 0.2
  },
  collectionStartHour:{
    type: Number,
    default: 9
  },
  collectionEndHour:{
    type: Number,
    default: 21
  },
  isActive:{
    type: Boolean,
    default: false
  },
},{
  timestamps: true
});

export default mongoose.model('MinimumRequirement', minimumRequirementsSchema);
