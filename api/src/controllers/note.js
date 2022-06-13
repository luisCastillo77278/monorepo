const NoteModel = require('../models/Note');
const UserModel = require('../models/User');

const noteControllers = {
  getNotes: async (_req, res) => {
    const notes = await NoteModel.find({ state: true })
      .populate('user', {
        notes: 0,
        blogs: 0
      });
    return res.status(200).json(notes);
  },
  getNote: async (req, res) => {
    const { id } = req.params;
    const note = await NoteModel.findById(id)
      .populate('user', {
        notes: 0,
        blogs: 0
      });
    return res.status(200).json(note);
  },
  create: async (req, res) => {
    const { id } = req;
    const { content, important } = req.body;
    const user = await UserModel.findById(id);
    const note = new NoteModel({
      content,
      important,
      date: new Date(),
      user: user._id
    });

    const noteNew = await note.save();
    user.notes = user.notes.concat(noteNew._id);
    await user.save();
    return res.status(200).json(noteNew);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const note = req.body;
    const response = await NoteModel.findByIdAndUpdate(id, note, { new: true });
    return res.status(200).json(response);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const note = await NoteModel.findByIdAndUpdate(id, { state: false }, { new: true });
    return res.status(200).json(note);
  }
};

module.exports = noteControllers;