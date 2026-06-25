const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const slotsRouter        = require('./routes/slots')
const reservationsRouter = require('./routes/reservations')

const app  = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aquacoach')
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB :', err))

// Routes
app.use('/api/slots',        slotsRouter)
app.use('/api/reservations', reservationsRouter)

app.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}`)
})
