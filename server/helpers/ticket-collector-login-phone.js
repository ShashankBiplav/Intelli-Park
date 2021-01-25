import jwt from 'jsonwebtoken';

import {validationErrorHandler} from './validation-error-handler.js';

export const login = async (req, res, next, Model) => {
  validationErrorHandler(req, next);
  const {phone, otp} = req.body;
  if (!phone || !otp) {
    return;
  }
  try {
    const user = await Model.findOne({phone: phone, otp: otp});
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
