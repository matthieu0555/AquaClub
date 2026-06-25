const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
  date:        { type: String, required: true },  // ex: "2024-01-15"
  startTime:   { type: String, required: true },  // ex: "09:00"
  endTime:     { type: String, required: true },  // ex: "10:00"
  isAvailable: { type: Boolean, default: true },
  isBooked:    { type: Boolean, default: false }
})

module.exports = mongoose.model('Slot', slotSchema)
