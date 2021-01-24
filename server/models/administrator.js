import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const administratorSchema = new Schema({
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
  resetToken:{
    type: String
  },
  resetTokenExpiryDate:{
    type: Date
  }
},{
  timestamps: true
});

export default mongoose.model('Administrator', administratorSchema);
