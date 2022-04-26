const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true, unique: true },
  Verified: { type: Boolean, default: false },
  SuperAdmin: { type: Boolean, default: false },
  Admin: { type: Boolean, default: false },
  Writer: { type: Boolean, default: false },
  ReadOnly: { type: Boolean, default: true },

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = { User };