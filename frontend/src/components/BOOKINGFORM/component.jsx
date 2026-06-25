import { useState } from 'react'
import { API } from '../../api'
import './component.css'

const LEVELS = {
  fr: ['Débutant(e)', 'Intermédiaire', 'Avancé(e)', 'Compétition'],
  en: ['Beginner', 'Intermediate', 'Advanced', 'Competition']
}

const INFO = {
  fr: [
    { icon: '📍', label: 'Lieu', title: 'Piscines choisies par votre coach', sub: 'Selon votre localisation' },
    { icon: '⏱', label: 'Disponibilités', title: '7j/7 selon les créneaux', sub: 'Matin · Après-midi · Soir' },
    { icon: '⚡', label: 'Réponse', title: 'Sous 24h ouvrées', sub: 'Confirmation manuelle par votre coach' },
  ],
  en: [
    { icon: '📍', label: 'Location', title: 'Pools chosen by your coach', sub: 'Based on your location' },
    { icon: '⏱', label: 'Availability', title: '7 days a week', sub: 'Morning · Afternoon · Evening' },
    { icon: '⚡', label: 'Response', title: 'Within 24 business hours', sub: 'Manual confirmation by your coach' },
  ]
}

export default function BOOKINGFORM({ slot, lang, t, onSuccess, onBack }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    level: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const levels = LEVELS[lang] || LEVELS.fr
  const info   = INFO[lang]   || INFO.fr

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId: slot._id, ...form })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
      } else {
        onSuccess()
      }
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  const submitLabel = lang === 'fr' ? 'Confirmer ma réservation →' : 'Confirm my booking →'
  const note        = lang === 'fr'
    ? 'Votre coach vous recontactera dans les 24h pour confirmer le créneau et la piscine.'
    : 'Your coach will contact you within 24h to confirm the slot and pool location.'

  return (
    <div className="bookingform-wrap">

      {/* ── Colonne gauche ── */}
      <div className="bookingform-left">
        <button className="back-btn" onClick={onBack}>← {t.booking.back}</button>

        <p className="section-label">{lang === 'fr' ? 'Réservation' : 'Booking'}</p>
        <h2 className="bookingform-heading">
          {lang === 'fr' ? 'Prenons\nrendez-vous' : 'Let\'s meet'}
        </h2>

        <div className="bookingform-slot-badge">
          <span className="bsb-date">{slot.date}</span>
          <span className="bsb-time">{slot.startTime} – {slot.endTime}</span>
        </div>

        <p className="bookingform-intro">
          {lang === 'fr'
            ? 'Remplissez ce formulaire et votre coach vous recontactera pour confirmer le créneau, la piscine et les modalités de votre première séance.'
            : 'Fill out this form and your coach will contact you to confirm the slot, pool location, and details of your first session.'}
        </p>

        <div className="bookingform-info-list">
          {info.map((item, i) => (
            <div key={i} className="bfi-item">
              <div className="bfi-icon">{item.icon}</div>
              <div>
                <p className="bfi-label">{item.label}</p>
                <p className="bfi-title">{item.title}</p>
                <p className="bfi-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colonne droite (formulaire) ── */}
      <div className="bookingform-right">
        <form onSubmit={handleSubmit}>
          <div className="bf-row">
            <label className="bf-field">
              <span>{lang === 'fr' ? 'Prénom' : 'First name'}</span>
              <input
                name="firstName"
                placeholder="Jean"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label className="bf-field">
              <span>{lang === 'fr' ? 'Nom' : 'Last name'}</span>
              <input
                name="lastName"
                placeholder="Dupont"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="bf-field">
            <span>{lang === 'fr' ? 'Téléphone' : 'Phone'}</span>
            <input
              name="phone"
              type="tel"
              placeholder="+1 514 000 0000"
              value={form.phone}
              onChange={handleChange}
            />
          </label>

          <label className="bf-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="jean@exemple.ca"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="bf-field">
            <span>{lang === 'fr' ? 'Niveau actuel' : 'Current level'}</span>
            <select name="level" value={form.level} onChange={handleChange}>
              <option value="">{lang === 'fr' ? 'Choisir votre niveau…' : 'Choose your level…'}</option>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>

          <label className="bf-field">
            <span>{lang === 'fr' ? 'Message & disponibilités' : 'Message & availability'}</span>
            <textarea
              name="message"
              rows="4"
              placeholder={lang === 'fr' ? 'Décrivez vos objectifs et créneaux préférés…' : 'Describe your goals and preferred schedule…'}
              value={form.message}
              onChange={handleChange}
            />
          </label>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? '…' : submitLabel}
          </button>

          <p className="bf-note">{note}</p>
        </form>
      </div>

    </div>
  )
}
