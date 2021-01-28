//models
import MinimumRequirement from '../models/minimum-requirements.js';

import ParkingTicket from '../models/parking-ticket.js';

import TicketCollector from '../models/ticket-collector.js';

//helper functions
import {validationErrorHandler} from '../helpers/validation-error-handler.js';

//get all parking tickets
export const getAllParkingTickets = async (req, res, next) => {
  try {
    let {fromDate, toDate} = req.body;
    const skip = parseInt(req.body.skip);
    const limit = parseInt(req.body.limit);
    let filter;
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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//get active parking tickets
export const getActiveParkingTickets= async (req, res, next) => {
  try{
    const parkingTickets = await ParkingTicket.find({isActive:{$eq: true}});
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

// get all ticket collectors
export const getAllTicketCollectors = async (req, res, next) => {
  try {
    const ticketCollectors = await TicketCollector.find({}, {otp: 0, password: 0}, {sort: {createdAt: -1}});
    res.status(200).json({
      message: 'All Ticket Collectors fetched',
      ticketCollectors: ticketCollectors,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//create new minimum requirements
export const createNewMinimumRequirement = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {
    min2WheelerHourly,
    min4WheelerHourly,
    min4WheelerPerMinute,
    min2WheelerPerMinute,
    collectionStartHour,
    collectionEndHour
  } = req.body;
  const minRequirement = new MinimumRequirement({
    min2WheelerHourly: min2WheelerHourly,
    min2WheelerPerMinute: min2WheelerPerMinute,
    min4WheelerPerMinute: min4WheelerPerMinute,
    min4WheelerHourly: min4WheelerHourly,
    collectionStartHour: collectionStartHour,
    collectionEndHour: collectionEndHour,
    isActive: true
  });
  try {
    const minimumRequirements = await MinimumRequirement.find();
    const minReqCount = await MinimumRequirement.find().countDocuments();
    for (let index = 0; index < minReqCount; index++) {
      await MinimumRequirement.findByIdAndRemove(minimumRequirements[index]._id);
    }
    const result = await minRequirement.save();
    res.status(201).json({
      message: 'New Requirement created',
      result: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//authorize or unauthorize a ticket collector
export const toggleTicketCollectorAuthorization = async (req, res, next) => {
  const ticketCollectorId = req.params.ticketCollectorId;
  try {
    const ticketCollector = await TicketCollector.findById(ticketCollectorId);
    if (!ticketCollector) {
      const error = new Error('No such ticket collector found');
      error.statusCode = 404;
      return next(error);
    }
    ticketCollector.isAuthorized = !ticketCollector.isAuthorized;
    await ticketCollector.save();
    res.status(201).json({
      message: 'Ticket collector updated'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
