//models
import ParkingTicket from '../models/parking-ticket.js';

//helpers
import {validationErrorHandler} from '../helpers/validation-error-handler.js';

//get ticket details
export const getTicket = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {vehicleNumber, ownerPhone} = req.body;
  try{
    const ticket =await ParkingTicket.findOne({vehicleNumber:vehicleNumber,ownerPhone: ownerPhone,isActive:{$eq: true}});
    if (!ticket)
    {
      const error = new Error('No Active ticket found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: 'Parking ticket fetched',
      ticket:ticket
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
