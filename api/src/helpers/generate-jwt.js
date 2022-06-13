const jwt = require('jsonwebtoken');

const generateJWT = (payload = { id: '' }) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_API_KEY,
      (err, token) => {
        if (err) {
          reject(new Error('El token no se genero'));
        } else {
          resolve(token);
        }
      }
    );
  });

module.exports = generateJWT;