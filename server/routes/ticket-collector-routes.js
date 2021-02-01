import express from 'express';

import expressValidator from 'express-validator';

import * as ticketCollectorController from '../controllers/ticket-collector-controller.js';

import {isTicketCollector} from '../middleware/is-ticket-collector.js';

const router = express.Router();

//CREATE A NEW TICKET
router.post('/create-ticket', isTicketCollector, [
  expressValidator.check('vehicleNumber').not().isEmpty(),
  expressValidator.check('amount').not().isEmpty(),
  expressValidator.check('vehicleType').not().isEmpty().isInt(),
], ticketCollectorController.createNewParkingTicket);

//END EXISTING TICKET
router.put('/end-ticket/:ticketId', isTicketCollector, ticketCollectorController.endParkingTicket);

//GET ALL AND PAGINATED +FILTERED TICKETS
router.post('/tickets', isTicketCollector, ticketCollectorController.getParkingTickets);

//GET ACTIVE TICKETS
router.get('/active-tickets', isTicketCollector, ticketCollectorController.getActiveParkingTickets);

export default router;
