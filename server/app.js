const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
///////////////////////////////////////////////////////////
const ErrorHandler = require('./utils/errorHandler');
const errorMiddleware = require('./middlewares/error');
const httpStatusCodes = require('./utils/httpStatusCodes');
///////////////////////////////////////////////////////////
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');
const orderRouter = require('./routes/orderRouter');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://amazon-clone-mern-dev.herokuapp.com',
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com/v3'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          'https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg',
        ],
        connectSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
    },
    // crossOriginOpenerPolicy: { policy: 'cross-origin' },
    // crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const apiLimiter = rateLimit({
  windowMs: 1000 * 60 * 15, // 15 minutes
  max: 100, // Limit to maximum 100 request per time
  standardHeaders: true,
  legacyHeaders: false,
  messsage:
    'Too many request from this IP Address, please try again in an hour',
});
app.use('/api', apiLimiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/../client/build`));

app.use(hpp({ whitelist: ['price'] }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());

if (process.env.NODE_ENV !== 'production') morgan('dev');

// Routes middlewares
// app.use((req, res, next) => {
//   console.log(`${req.method}: ${req.originalUrl}`);
//   next();
// });
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

// Unhandled routes middleware
app.all('*', (req, res, next) => {
  next(
    new ErrorHandler(
      `Can't find ${req.originalUrl} on this server.`,
      httpStatusCodes.NOT_FOUND
    )
  );
});

// Error handler middleware
app.use(errorMiddleware);

// Export the application
module.exports = app;
