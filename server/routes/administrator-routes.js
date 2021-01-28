import express from 'express';

import expressValidator from 'express-validator';

import * as administratorController from '../controllers/administrator-controller.js';

import {isAdmin} from '../middleware/is-admin.js';

const router = express.Router();

//GET ALL TICKET COLLECTORS
router.get('/ticket-collectors',isAdmin, administratorController.getAllTicketCollectors);

//GET ACTIVE TICKETS
router.get('/active-tickets', isAdmin, administratorController.getActiveParkingTickets);

//GET ALL AND PAGINATED +FILTERED TICKETS
router.post('/tickets', isAdmin, administratorController.getAllParkingTickets);

//CREATE A NEW MINIMUM REQUIREMENT
router.post('/create-requirements', isAdmin, [expressValidator.check('min2WheelerHourly').isInt().not().isEmpty(),
  expressValidator.check('min4WheelerHourly').isInt().not().isEmpty(), expressValidator.check('collectionStartHour').isInt().not().isEmpty(), expressValidator.check('collectionEndHour').isInt().not().isEmpty()], administratorController.createNewMinimumRequirement);

//TOGGLE TICKET COLLECTOR AUTHORIZATION
router.put('/toggle-auth/:ticketCollectorId', isAdmin, administratorController.toggleTicketCollectorAuthorization);

export default router;
