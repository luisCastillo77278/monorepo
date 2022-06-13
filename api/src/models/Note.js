const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  content: {
    type: String
  },
  date: {
    type: Date
  },
  important: {
    type: Boolean
  },
  state: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

noteSchema.set('toJSON', {
  transform: (_document, object) => {
    const { _id, __v, ...params } = object;
    return { ...params, id: _id };
  }
});


module.exports = model('Note', noteSchema);