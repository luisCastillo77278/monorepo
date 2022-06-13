const { connect } = require('mongoose');

const connectionDB = async (uri = '') => {
  try {
    await connect(uri);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { connectionDB };