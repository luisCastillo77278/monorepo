const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/generate-jwt');
const UserModel = require('../models/User');

const loginController = {

  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    const correctPassword = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && correctPassword))
      return res.status(401).json({
        error: 'invalid user or password'
      });

    const token = await generateJWT({ id: user._id });

    return res.status(200).json({
      token,
      user
    });
  }
};


module.exports = loginController;