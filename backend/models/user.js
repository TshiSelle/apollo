const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true, unique: true },
  Verified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, unique: true },
  passResetToken: { type: String, expires: '1hr' },
  passResetTokenExpirationDate: { type: Number, expires: '1hr' },
  Writer: { type: Boolean, default: false },
  ReadOnly: { type: Boolean, default: true },

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = { User };