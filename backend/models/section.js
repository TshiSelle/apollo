const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sectionSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  _PID: {
    type: Schema.Types.ObjectId,
    ref: "Page"
  }
}, { timestamps: true });


const Section = mongoose.model('Section', sectionSchema);

module.exports = { Section };