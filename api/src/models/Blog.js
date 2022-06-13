const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  author: {
    type: String
  },
  url: {
    type: String
  },
  title: {
    type: String
  },
  likes: {
    type: String
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


blogSchema.set('toJSON', {
  transform: (_document, object) => {
    const { _id, __v, ...params } = object;
    return { ...params, id: _id };

  }
});

module.exports = model('Blog', blogSchema);