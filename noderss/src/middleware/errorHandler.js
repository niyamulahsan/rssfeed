const createError = require("http-errors");
const { validationResult } = require("express-validator");

// not found handler
const notFoundHandler = async (req, res, next) => {
  next(createError(404, "Page not found!"));
};

// express validator error handler
const validation = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(403).json({ errors: result.array() });
  } else {
    next();
  }
};

// default handler
const defaultErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
};

module.exports = { notFoundHandler, validation, defaultErrorHandler };