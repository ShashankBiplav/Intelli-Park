//core modules
import path from 'path';

//installed modules
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import multer from 'multer';
import dotenv from 'dotenv';

//CRON JOBS
import {checkAndIncreaseActiveTicketsPrice} from './helpers/cron/auto-price-incrementor.js';

//TODO:disable in production
dotenv.config();

// PORT
const port = process.env.PORT || 3300;

const app = express();

// All routes imported here
import authenticationRoutes from './routes/authentication-routes.js';

import ticketCollectorRoutes from './routes/ticket-collector-routes.js';

import administratorRoutes from './routes/administrator-routes.js';

import userRoutes from './routes/user-routes.js';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'));

//defining absolute path of current WORKDIR
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

//cors error function
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Entry point for routes
app.use('/auth', authenticationRoutes);

app.use('/ticket-collector',ticketCollectorRoutes);

app.use('/administrator',administratorRoutes);

app.use('/user',userRoutes);

app.use(helmet());

app.use(compression());

//central error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

//CRON execution
checkAndIncreaseActiveTicketsPrice();

//mongo db connection
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`listening on port${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
