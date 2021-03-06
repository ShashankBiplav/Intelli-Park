//models
import ParkingTicket from '../models/parking-ticket.js';

import TicketCollector from '../models/ticket-collector.js';

//helper functions
import {validationErrorHandler} from '../helpers/validation-error-handler.js';

import {checkTimeValidity} from '../helpers/check-time.js';

//create a new ticket
export const createNewParkingTicket = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {vehicleNumber, amount, vehicleType, ownerPhone} = req.body;
  try{
    if (!(vehicleType===2 || vehicleType===4)){
      const error = new Error('Inappropriate vehicle');
      error.statusCode = 403;
      return next(error);
    }
    const ticketCollector = await TicketCollector.findById(req.userId);
    if (ticketCollector.isVerified === false || ticketCollector.isAuthorized === false){
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      return next(error);
    }
    const isTimeValid =  await checkTimeValidity();
    if (!isTimeValid){
      const error = new Error('Invalid time');
      error.statusCode = 403;
      return next(error);
    }
    const createdBy = {_id: ticketCollector._id, phone: ticketCollector.phone, name: ticketCollector.name};
    const parkingTicket = new ParkingTicket({
      vehicleNumber: vehicleNumber,
      startingTime:new Date().toISOString(),
      amount: amount,
      ownerPhone:ownerPhone,
      vehicleType: vehicleType,
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
    parkingTicket.endingTime = new Date().toISOString();
    parkingTicket.collectedBy = {_id: ticketCollector._id, phone: ticketCollector.phone, name: ticketCollector.name};
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

//get all parking tickets
export const getParkingTickets = async(req, res, next) => {
  try{
    let {fromDate, toDate} = req.body;
    const skip = parseInt(req.body.skip);
    const limit = parseInt(req.body.limit);
    let filter;
    const ticketCollector = await TicketCollector.findById(req.userId);
    if (ticketCollector.isVerified === false || ticketCollector.isAuthorized === false){
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      return next(error);
    }
    const parkingTicketsCount = await ParkingTicket.find().countDocuments();
    if (!fromDate || !toDate) {
      const parkingTickets = await ParkingTicket.find().sort({createdAt: -1}).skip(skip).limit(limit);
      res.status(200).json({
        message: 'All parking tickets fetched',
        parkingTickets: parkingTickets,
        total: parkingTicketsCount
      });
      return;
    }
    filter = {createdAt: {$gte: fromDate, $lte: toDate}};
    const parkingTickets = await ParkingTicket.find(filter).sort({createdAt: -1}).skip(skip).limit(limit);
    res.status(200).json({
      message: 'Filtered parking tickets fetched',
      parkingTickets: parkingTickets,
      total: parkingTicketsCount
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getActiveParkingTickets= async (req, res, next) => {
  try{
    const parkingTickets = await ParkingTicket.find({isActive:{$eq: true}}).sort({createdAt: -1});
    res.status(200).json({
      message: "Active parking tickets fetched",
      parkingTickets: parkingTickets
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
