import bcrypt from 'bcryptjs';
import {validationErrorHandler} from './validation-error-handler.js';
import {isPhoneUnique} from './is-phone-unique.js';

export const userSignUpUsingPhone = async (req, res, next, Model) => {
  validationErrorHandler(req, next);
  const {phone, name, password} = req.body;
  try {
    const hashedPwd = await bcrypt.hash(password, 12);
    const isUnique = await isPhoneUnique(Model, phone);
    if (!isUnique) {
      const error = new Error('User already exists');
      error.statusCode = 403;
      return next(error);
    } else {
      const user = new Model({
        phone: phone,
        name: name,
        password: hashedPwd
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
