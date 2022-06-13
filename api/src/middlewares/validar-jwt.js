const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const authorization = req.header('Authorization');

  if (!(authorization &&
    authorization
      .toLowerCase()
      .startsWith('bearer ')
  ))
    return res.status(500).json({
      error_type: 'TokenUndefined',
      msg: 'token is undefined'
    });

  const payload = authorization.substring(7);

  const { id } = jwt.verify(payload, process.env.SECRET_API_KEY);

  req.id = id;
  return next();
};


module.exports = validarJWT;