const express = require('express')
const router = express.Router()
const Slot = require('../models/Slot')
const adminAuth = require('../middleware/adminAuth')

// GET /api/slots — créneaux publics (disponibles et non-réservés)
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find({ isAvailable: true, isBooked: false }).sort({ date: 1, startTime: 1 })
    res.json(slots)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/slots/admin — tous les créneaux (admin seulement)
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const slots = await Slot.find().sort({ date: 1, startTime: 1 })
    res.json(slots)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/slots/generate — générer des créneaux depuis un bloc horaire (admin)
router.post('/generate', adminAuth, async (req, res) => {
  try {
    const { date, startTime, endTime, duration } = req.body

    const [startH, startM] = startTime.split(':').map(Number)
    const [endH, endM]     = endTime.split(':').map(Number)

    const startMin = startH * 60 + startM
    const endMin   = endH * 60 + endM

    const slots = []
    let current = startMin

    while (current + duration <= endMin) {
      const from = `${String(Math.floor(current / 60)).padStart(2, '0')}:${String(current % 60).padStart(2, '0')}`
      const to   = `${String(Math.floor((current + duration) / 60)).padStart(2, '0')}:${String((current + duration) % 60).padStart(2, '0')}`
      slots.push({ date, startTime: from, endTime: to })
      current += duration
    }

    const created = await Slot.insertMany(slots)
    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/slots/:id — supprimer un créneau (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Slot.findByIdAndDelete(req.params.id)
    res.json({ message: 'Créneau supprimé' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT /api/slots/:id/toggle — activer ou désactiver un créneau (admin)
router.put('/:id/toggle', adminAuth, async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id)
    slot.isAvailable = !slot.isAvailable
    await slot.save()
    res.json(slot)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
