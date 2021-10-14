const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  is_deleted: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model('User', User);
