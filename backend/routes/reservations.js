const express = require('express')
const router = express.Router()
const Reservation = require('../models/Reservation')
const Slot = require('../models/Slot')
const adminAuth = require('../middleware/adminAuth')

// GET /api/reservations — toutes les réservations (admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, startTime: 1 })
    res.json(reservations)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/reservations — créer une réservation (public)
router.post('/', async (req, res) => {
  try {
    const { slotId, firstName, lastName, email, phone, level, message } = req.body

    const slot = await Slot.findById(slotId)
    if (!slot || !slot.isAvailable || slot.isBooked) {
      return res.status(400).json({ message: "Ce créneau n'est plus disponible." })
    }

    const reservation = new Reservation({
      slot:      slotId,
      firstName,
      lastName,
      email,
      phone:     phone   || '',
      level:     level   || '',
      message:   message || '',
      date:      slot.date,
      startTime: slot.startTime,
      endTime:   slot.endTime
    })
    await reservation.save()

    slot.isBooked = true
    await slot.save()

    res.status(201).json(reservation)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/reservations/:id — annuler une réservation (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable.' })
    }

    // Remettre le créneau disponible
    const slot = await Slot.findById(reservation.slot)
    if (slot) {
      slot.isBooked = false
      await slot.save()
    }

    await Reservation.findByIdAndDelete(req.params.id)
    res.json({ message: 'Réservation annulée.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
