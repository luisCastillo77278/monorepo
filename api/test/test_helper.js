const NoteModel = require('../src/models/Note');

const initialNotes = [
  {
    content: 'Prueba testing jest 1',
    important: true,
    date: new Date()
  },
  {
    content: 'Prueba testing jest 2',
    important: true,
    date: new Date()
  }
];

const noteInDb = async () => {
  const notes = await NoteModel.find({ state: true });
  return notes.map(note => note.toJSON());
};

module.exports = {
  initialNotes,
  noteInDb
};