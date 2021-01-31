//packages
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

//models
import Administrator from '../models/administrator.js';

import TicketCollector from '../models/ticket-collector.js';

//helpers
import {userSignUpUsingPhone} from '../helpers/ticket-collector-signup-phone.js';

import {ticketCollectorGetOtpToSignIn} from '../helpers/ticket-collector-get-otp.js';

import {login} from '../helpers/ticket-collector-login-phone.js';

import {validationErrorHandler} from '../helpers/validation-error-handler.js';

//ticket collector signup using phone
export const ticketCollectorSignupUsingPhone = async (req, res, next) => {
  await userSignUpUsingPhone(req, res, next, TicketCollector);
};

export const ticketCollectorGetOtp = async (req, res, next) => {
  await ticketCollectorGetOtpToSignIn(req, res,next, TicketCollector);
};

//ticket collector login using phone and password
export const ticketCollectorLoginUsingPhone = async (req, res, next) => {
  await login(req, res, next, TicketCollector);
};

//admin signup
export const administratorSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, email, password} = req.body;
  const preExistingAdmin = await Administrator.findOne({email: email});
  if (preExistingAdmin) {
    const error = new Error('Admin with this email already exists');
    error.statusCode = 422;
    return next(error);
  }
  try {
    const hashedPwd = await bcrypt.hash(password, 12);
    const admin = new Administrator({
      email: email,
      password: hashedPwd,
      name: name
    });
    const result = await admin.save();
    res.status(201).json({
      message: 'Admin Created',
      userId: result._id
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//administrator login
export const administratorLogin = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {email, password} = req.body;
  let loadedAdmin;
  try {
    const admin = await Administrator.findOne({email: email});
    if (!admin) {
      const error = new Error('Admin with this email doesn\'t exist');
      error.statusCode = 404;
      throw error;
    }
    loadedAdmin = admin;
    const isPwdEqual = await bcrypt.compare(password, admin.password);
    if (!isPwdEqual) {
      const error = new Error('Wrong Password');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email: loadedAdmin.email,
      userId: loadedAdmin._id.toString()
    }, 'yoursuperdupersecretkeythatisknownonlytoyouandtheserver', {
      expiresIn: '24h'
    });
    res.status(200).json({
      token: token,
      userId: loadedAdmin._id.toString()
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//function to reset admin password
export const resetAdminPassword = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {email, otp, password} = req.body;
  
  try {
    const admin = await Administrator.findOne({
      resetToken: otp,
      resetTokenExpiryDate: {
        $gt: Date.now()
      },
      email: email
    })
    if (!admin) {
      const error = new Error('Admin with this email doesn\'t exist');
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    admin.password = hashedPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiryDate = undefined;
    await admin.save();
    res.status(201).json({
      message: 'Password Updated!',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
