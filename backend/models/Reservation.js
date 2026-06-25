const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
  slot:      { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, default: '' },
  level:     { type: String, default: '' },
  message:   { type: String, default: '' },
  date:      { type: String, required: true },
  startTime: { type: String, required: true },
  endTime:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Reservation', reservationSchema)
