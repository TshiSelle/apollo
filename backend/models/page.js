const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  _UID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });


const Page = mongoose.model('Page', pageSchema);

module.exports = { Page };