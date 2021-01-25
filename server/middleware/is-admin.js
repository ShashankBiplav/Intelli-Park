import jwt from 'jsonwebtoken';

import Administrator from '../models/administrator.js';

export const isAdmin = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  try {
    if (!authHeader) {
      const error = new Error('Not Authorized');
      error.status = 401;
      return next(error);
    }
    const token = authHeader.split(' ')[1]; //Authorization header looks like {Authorization: 'Bearer ' + this.props.token} on the front end
    let decodedToken;
    
    decodedToken = jwt.verify(token, 'yoursuperdupersecretkeythatisknownonlytoyouandtheserver');
    if (!decodedToken) {
      const error = new Error('Not Authorized');
      error.status = 401;
      next(error);
    }
    const admin = await Administrator.findById(decodedToken.userId);
    if (!admin) {
      const error = new Error('Admin not found');
      error.status = 404;
      next(error);
    }
    req.userId = decodedToken.userId; //setting userId to request
    next();
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
