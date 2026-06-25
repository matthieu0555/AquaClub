import { useState, useEffect } from 'react'
import { API } from '../../api'
import './component.css'

export default function TIMESLOTS({ date, t, onSlotSelect, onBack }) {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${API}/slots`)
      .then(res => res.json())
      .then(all => {
        setSlots(all.filter(s => s.date === date))
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [date])

  return (
    <div className="timeslots">
      <button className="back-btn" onClick={onBack}>← {t.booking.back}</button>
      <h3 className="timeslots-date">{date}</h3>
      <p className="timeslots-label">{t.booking.selectTime}</p>

      {loading ? (
        <p className="timeslots-empty">Chargement…</p>
      ) : slots.length === 0 ? (
        <p className="timeslots-empty">Aucun créneau disponible pour cette date.</p>
      ) : (
        <div className="timeslots-grid">
          {slots.map(slot => (
            <button
              key={slot._id}
              className="slot-btn"
              onClick={() => onSlotSelect(slot)}
            >
              {slot.startTime} – {slot.endTime}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
