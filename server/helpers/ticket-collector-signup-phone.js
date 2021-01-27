import {validationErrorHandler} from './validation-error-handler.js';
import {generateOTP} from './generate-otp.js';
import {isPhoneUnique} from './is-phone-unique.js';

export const userSignUpUsingPhone = async (req, res, next, Model) => {
  validationErrorHandler(req, next);
  
  const {phone} = req.body;
  const generatedOTP = Number.parseInt(generateOTP());
  
  //sending otp to the user
  try {
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
          msg: `User registered!`,
        });
      }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
