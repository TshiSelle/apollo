const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, unique: true },
  passResetToken: { type: String, expires: '1hr' },
  passResetTokenExpirationDate: { type: Number, expires: '1hr' },
  deactivationDate: { type: Date, default: undefined },
  writer: { type: Boolean, default: false }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = { User };