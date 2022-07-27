/*
  Catch asynchronous errors
  And pass unto general error handler
*/
module.exports = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
