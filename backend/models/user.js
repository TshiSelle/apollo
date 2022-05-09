const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true, unique: true },
  emailVerificationToken: { type: String, unique: true },
  Writer: { type: Boolean, default: false }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = { User };