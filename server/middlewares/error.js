const ErrorHandler = require('../utils/errorHandler');
const httpStatusCodes = require('../utils/httpStatusCodes');

const handleValidationError = () => {
  return new ErrorHandler('Invalid data entries', httpStatusCodes.BAD_REQUEST);
};

const handleMongoServerError = () => {
  return new ErrorHandler(
    'Duplicate field already exists! try another.',
    httpStatusCodes.BAD_REQUEST
  );
};

const handleCastError = () => {
  return new ErrorHandler(
    'Document does not exist.',
    httpStatusCodes.BAD_REQUEST
  );
};

const handleDuplicateFieldsDB = () => {
  return new ErrorHandler('Dulicate fields', httpStatusCodes.BAD_REQUEST);
};

const sendDevError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  return res.status(httpStatusCodes.INTERNAL_SERVER).json({
    status: 'error',
    message: 'Something went very wrong.',
  });
};

const sendProdError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  console.error(`Application Error: ${err.name} 🔥🔥🔥`);

  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'ValidationError') err = handleValidationError();
    if (err.name === 'MongoServerError') err = handleMongoServerError();
    if (err.name === 'CastError') err = handleCastError();
    if (err.code === 11000) err = handleDuplicateFieldsDB();

    sendDevError(err, req, res);
  }

  if (process.env.NODE_ENV === 'production') sendProdError(err, req, res);
};
