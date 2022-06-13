
const HANDLE_ERROR = {
  ValidationError: (res, error) => {
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  JsonWebTokenError: (res, error) => {
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  MongoServerError: (res, error) => {
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  },
  DefaultError: (res, error) => {
    res.status(500).json({
      error_type: error.name,
      msg: error.message
    });
  }
};


const handlingError = (error, req, res, next) => {

  const handle = HANDLE_ERROR[error.name] || HANDLE_ERROR.d;
  handle(res, error);
  next();
};

module.exports = {
  handlingError
};