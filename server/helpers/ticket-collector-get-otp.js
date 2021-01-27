import {validationErrorHandler} from './validation-error-handler.js';
import {generateOTP} from './generate-otp.js';
import {sendOtp} from './send-otp.js';

export const ticketCollectorGetOtpToSignIn = async (req, res, next, Model) => {
  validationErrorHandler(req, next);
  
  const {phone} = req.body;
  const generatedOTP = Number.parseInt(generateOTP());
  
  //sending otp to the user
  try {
    const response = await sendOtp(generatedOTP, phone);
    // save data once the "sms sent" returns 200 status code
    if (response.status === 200) {
      const user = await Model.findOne({phone:phone});
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        return next(error);
      }
        user.otp = generatedOTP;
        await user.save();
        res.status(201).json({
          msg: `OTP sent to ${phone}`,
        });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
