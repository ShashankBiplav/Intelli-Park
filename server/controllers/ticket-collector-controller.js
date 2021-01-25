//models
import MinimumRequirement from '../models/minimum-requirements.js';

import ParkingTicket from '../models/parking-ticket.js';

import TicketCollector from '../models/ticket-collector.js';

//helper functions
import {validationErrorHandler} from '../helpers/validation-error-handler.js';

//create a new ticket
export const createNewParkingTicket = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {vehicleNumber, amount } = req.body;
  try{
    const ticketCollector = await TicketCollector.findById(req.userId);
    if (ticketCollector.isVerified === false || ticketCollector.isAuthorized === false){
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      return next(error);
    }
    const createdBy = {_id: ticketCollector._id, phone: ticketCollector.phone};
    const parkingTicket = new ParkingTicket({
      vehicleNumber: vehicleNumber,
      startingTime:new Date().toISOString(),
      amount: amount,
      createdBy: createdBy
    });
    const result = await parkingTicket.save();
    res.status(201).json({
      message: 'New Ticket Created',
      result: result,
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//end a parking ticket i.e, closure
export const endParkingTicket = async (req, res, next) => {
  const ticketId = req.params.ticketId;
  try{
    const ticketCollector = await TicketCollector.findById(req.userId);
    if (ticketCollector.isVerified === false || ticketCollector.isAuthorized === false){
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      return next(error);
    }
    const parkingTicket =await ParkingTicket.findById(ticketId);
    if (!ticketId){
      const error = new Error('Not ticket found');
      error.statusCode = 404;
      return next(error);
    }
    if (parkingTicket.isActive === false){
      const error = new Error('Ticket already ended');
      error.statusCode = 403;
      return next(error);
    }
    parkingTicket.isAmountCollected = true;
    parkingTicket.isActive = false;
    parkingTicket.collectedBy = {_id: ticketCollector._id, phone: ticketCollector.phone};
    const result = await parkingTicket.save();
    res.status(201).json({
      message: 'parking ticket ended',
      result: result,
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
