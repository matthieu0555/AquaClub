import { useState, useEffect } from 'react'
import { API } from '../../api'
import './component.css'

export default function CALENDAR({ lang, t, onDateSelect }) {
  const [availableDates, setAvailableDates] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    fetch(`${API}/slots`)
      .then(res => res.json())
      .then(slots => {
        const dates = [...new Set(slots.map(s => s.date))]
        setAvailableDates(dates)
      })
      .catch(err => console.error(err))
  }, [])

  const year  = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // getDay() retourne 0=dimanche, on veut 0=lundi
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7
  const blanks         = Array(firstDayOfWeek).fill(null)
  const daysInMonth    = new Date(year, month + 1, 0).getDate()
  const days           = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const monthLabel = currentMonth.toLocaleDateString(
    lang === 'fr' ? 'fr-CA' : 'en-CA',
    { month: 'long', year: 'numeric' }
  )

  function formatDate(day) {
    const m = String(month + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    return `${year}-${m}-${d}`
  }

  function isAvailable(day) {
    return availableDates.includes(formatDate(day))
  }

  function isPast(day) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(year, month, day) < today
  }

  return (
    <div className="calendar">
      <div className="calendar-nav">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>←</button>
        <span className="calendar-month">{monthLabel}</span>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>→</button>
      </div>

      <div className="calendar-weekdays">
        {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map(d => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {blanks.map((_, i) => <div key={`b-${i}`} />)}
        {days.map(day => (
          <button
            key={day}
            className={`calendar-day${isPast(day) ? ' past' : ''}${isAvailable(day) ? ' available' : ''}`}
            disabled={!isAvailable(day) || isPast(day)}
            onClick={() => onDateSelect(formatDate(day))}
          >
            {day}
          </button>
        ))}
      </div>

      <p className="calendar-hint">{t.booking.selectDate}</p>
    </div>
  )
}
