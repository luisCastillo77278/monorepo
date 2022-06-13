const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');

const userControllers = {
  getUsers: async (req, res) => {
    const users = await UserModel.find({ state: true })
      .populate('notes', {
        user: 0
      });
    return res.status(200).json(users);
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id)
      .populate('notes', {
        user: 0
      });

    return res.status(200).json(user);
  },
  create: async (req, res, next) => {
    const { username, name, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      name,
      passwordHash
    });

    try {
      const userNew = await user.save();
      return res.status(200).json(userNew);
    } catch (err) {
      return next(err);
    }
  },
};


module.exports = userControllers;
