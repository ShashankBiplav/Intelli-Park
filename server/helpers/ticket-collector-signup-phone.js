import {validationErrorHandler} from './validation-error-handler.js';
import {generateOTP} from './generate-otp.js';
import {isPhoneUnique} from './is-phone-unique.js';
import {sendOtp} from './send-otp.js';

export const userSignUpUsingPhone = async (req, res, next, Model) => {
  validationErrorHandler(req, next);
  
  const {phone} = req.body;
  const generatedOTP = Number.parseInt(generateOTP());
  
  //sending otp to the user
  try {
    const response = await sendOtp(generatedOTP, phone);
    // save data once the "sms sent" returns 200 status code
    if (response.status === 200) {
      //if the number is unique, create a new user & send otp else send otp directly
      const isUnique = await isPhoneUnique(Model, phone);
      if (!isUnique) {
        const error = new Error('User already exists');
        error.statusCode = 403;
        return next(error);
      } else {
        const user = new Model({
          phone: phone,
          otp: generatedOTP
        });
        await user.save();
        res.status(201).json({
          msg: `User registered! OTP sent to ${phone}`,
        });
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
