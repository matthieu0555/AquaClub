import { useState, useEffect } from 'react'
import { API, ADMIN_PASSWORD } from '../../api'
import './component.css'

export default function SLOTLIST({ t, onChanged }) {
  const [slots, setSlots] = useState([])
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  useEffect(() => {
    fetch(`${API}/slots/admin`, {
      headers: { 'x-admin-password': ADMIN_PASSWORD }
    })
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(err => console.error(err))
  }, [])

  async function handleDelete(id) {
    await fetch(`${API}/slots/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': ADMIN_PASSWORD }
    })
    setSlots(slots.filter(s => s._id !== id))
    setPendingDeleteId(null)
    onChanged()
  }

  async function handleToggle(id) {
    const res = await fetch(`${API}/slots/${id}/toggle`, {
      method: 'PUT',
      headers: { 'x-admin-password': ADMIN_PASSWORD }
    })
    const updated = await res.json()
    setSlots(slots.map(s => s._id === id ? updated : s))
    onChanged()
  }

  const pendingSlot = slots.find(s => s._id === pendingDeleteId)

  if (slots.length === 0) {
    return <p className="empty-msg">{t.admin.noSlots}</p>
  }

  return (
    <>
      <div className="slotlist">
        <h3>{t.admin.slots}</h3>
        {slots.map(slot => (
          <div key={slot._id} className={`slot-item${slot.isBooked ? ' is-booked' : ''}`}>
            <div className="slot-info">
              <span className="slot-date">{slot.date}</span>
              <span className="slot-time">{slot.startTime} – {slot.endTime}</span>
            </div>

            <span className={`slot-badge ${slot.isBooked ? 'booked' : slot.isAvailable ? 'available' : 'inactive'}`}>
              {slot.isBooked ? t.admin.booked : slot.isAvailable ? t.admin.available : t.admin.unavailable}
            </span>

            <div className="slot-actions">
              {!slot.isBooked && (
                <button onClick={() => handleToggle(slot._id)}>
                  {slot.isAvailable ? t.admin.deactivate : t.admin.activate}
                </button>
              )}
              <button className="delete-btn" onClick={() => setPendingDeleteId(slot._id)}>
                {t.admin.delete}
              </button>
            </div>
          </div>
        ))}
      </div>

      {pendingDeleteId && (
        <div className="modal-overlay" onClick={() => setPendingDeleteId(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>Supprimer ce créneau ?</h3>
            <p>
              {pendingSlot
                ? `${pendingSlot.date} · ${pendingSlot.startTime} – ${pendingSlot.endTime}`
                : ''
              }
              <br />
              Cette action est irréversible.
            </p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setPendingDeleteId(null)}>
                Annuler
              </button>
              <button className="modal-confirm-danger" onClick={() => handleDelete(pendingDeleteId)}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
