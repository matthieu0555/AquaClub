import { useState, useEffect } from 'react'
import { API, ADMIN_PASSWORD } from '../../api'
import './component.css'

export default function RESERVATIONLIST({ t }) {
  const [reservations, setReservations] = useState([])
  const [pendingCancelId, setPendingCancelId] = useState(null)

  useEffect(() => {
    fetch(`${API}/reservations`, {
      headers: { 'x-admin-password': ADMIN_PASSWORD }
    })
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error(err))
  }, [])

  async function handleCancel(id) {
    await fetch(`${API}/reservations/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': ADMIN_PASSWORD }
    })
    setReservations(reservations.filter(r => r._id !== id))
    setPendingCancelId(null)
  }

  const pendingReservation = reservations.find(r => r._id === pendingCancelId)

  if (reservations.length === 0) {
    return <p className="empty-msg">{t.admin.noReservations}</p>
  }

  return (
    <>
      <div className="reservationlist">
        <h3>{t.admin.reservations}</h3>
        {reservations.map(r => (
          <div key={r._id} className="reservation-item">
            <span className="reservation-dot" />
            <div className="reservation-slot">
              {r.date}
              <span>{r.startTime} – {r.endTime}</span>
            </div>
            <div className="reservation-client">
              {r.firstName} {r.lastName}
              {r.level && <span>{r.level}</span>}
            </div>
            <div className="reservation-email">
              {r.email}
              {r.phone && <span>{r.phone}</span>}
            </div>
            <button
              className="reservation-cancel-btn"
              onClick={() => setPendingCancelId(r._id)}
            >
              Annuler
            </button>
          </div>
        ))}
      </div>

      {pendingCancelId && (
        <div className="modal-overlay" onClick={() => setPendingCancelId(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>Annuler cette réservation ?</h3>
            <p>
              {pendingReservation
                ? `${pendingReservation.firstName} ${pendingReservation.lastName} — ${pendingReservation.date} · ${pendingReservation.startTime} – ${pendingReservation.endTime}`
                : ''
              }
              <br />
              Le créneau sera remis en disponible.
            </p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setPendingCancelId(null)}>
                Garder
              </button>
              <button className="modal-confirm-warning" onClick={() => handleCancel(pendingCancelId)}>
                Confirmer l'annulation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
