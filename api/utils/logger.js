require('dotenv').config();

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const errors = (...params) => {
  console.log(...params);
};

module.exports = {
  info,
  errors
};