import jwt from 'jsonwebtoken';

import {validationErrorHandler} from './validation-error-handler.js';
import {checkTimeValidity} from "./check-time.js";
import bcrypt from "bcryptjs";

export const login = async (req, res, next, Model) => {
  validationErrorHandler(req, next);
  const {phone, password} = req.body;
  try {
    const user = await Model.findOne({phone: phone});
    if (!user) {
      const error = new Error('User with this email doesn\'t exist');
      error.statusCode = 404;
      throw error;
    }
    if (user.isAuthorized === false) {
      const error = new Error('Not Authorized! Contact Admin for support');
      error.statusCode = 403;
      return next(error);
    }
    const isTimeValid = await checkTimeValidity();
    if (!isTimeValid) {
      const error = new Error('Invalid time');
      error.statusCode = 403;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, user.password);
    if (!isPwdEqual) {
      const error = new Error('Wrong Password');
      error.statusCode = 403;
      return next(error);
    }
    const token = jwt.sign({
      phone: user.phone,
      userId: user._id.toString()
    }, 'yoursuperdupersecretkeythatisknownonlytoyouandtheserver', {
      expiresIn: '15h'
    });
    user.isVerified = true;
    await user.save();
    res.status(200).json({
      token: token,
      userId: user._id.toString()
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
