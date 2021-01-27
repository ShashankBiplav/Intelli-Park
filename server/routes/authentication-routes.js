import express from 'express';

import expressValidator from 'express-validator';

import * as authController from '../controllers/authentication-controller.js';

const router = express.Router();

//TICKET COLLECTOR SIGNUP USING PHONE
router.post('/ticket-collector/signup/phone', [
  expressValidator.check('phone').trim().isInt().isLength({min: 10}).withMessage("Phone must be an integer")
], authController.ticketCollectorSignupUsingPhone);

//TICKET COLLECTOR SIGNUP USING PHONE
router.post('/ticket-collector/get-otp', [
  expressValidator.check('phone').trim().isInt().isLength({min: 10}).withMessage("Phone must be an integer")
], authController.ticketCollectorGetOtp);

//TICKET COLLECTOR LOGIN USING PHONE
router.post('/ticket-collector/login/phone', [
  expressValidator.check('phone').trim().isInt().isLength({min: 10}).withMessage("Phone must be an integer"), expressValidator.check('otp').trim().isInt().isLength({min: 6})
], authController.ticketCollectorLoginUsingPhone);

//ADMINISTRATOR SIGNUP
router.post('/administrator/signup', [expressValidator.check('name').trim().not().isEmpty(),
  expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
  expressValidator.check('password').trim().isLength({
    min: 10
  })
], authController.administratorSignup);

//ADMINISTRATOR LOGIN
router.post('/administrator/login', [expressValidator.check('email').isEmail().normalizeEmail(),
    expressValidator.check('password').trim().isLength({
      min: 10
    })],
  authController.administratorLogin);

//ADMINISTRATOR RESET PASSWORD
router.post('/administrator/reset-password',
  [expressValidator.check('email').isEmail().normalizeEmail(),
    expressValidator.check('otp').not().isEmpty(),
    expressValidator.check('password').trim().isLength({
      min: 10
    })],
  authController.resetAdminPassword);

export default router;
