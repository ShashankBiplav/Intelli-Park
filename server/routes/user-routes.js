import express from 'express';
import expressValidator from 'express-validator';

import * as userController from '../controllers/user-controller.js';

const router = express.Router();

router.post('/ticket',[
  expressValidator.check('vehicleNumber').not().isEmpty(),
  expressValidator.check('ownerPhone').not().isEmpty().isInt().isLength({min:10}),
],userController.getTicket);

export default router;
