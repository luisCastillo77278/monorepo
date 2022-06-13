const { Schema, model } = require('mongoose');
// const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({

  username: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String
  },
  state: {
    type: Boolean,
    default: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]

});


// userSchema.plugin(mongooseUniqueValidator);

userSchema.set('toJSON', {
  transform: (_document, object) => {
    const { _id, __v, passwordHash, ...rest } = object;
    return { ...rest, id: _id };
  }
});


module.exports = model('User', userSchema);