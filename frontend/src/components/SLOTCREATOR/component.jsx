import { useState } from 'react'
import { API, ADMIN_PASSWORD } from '../../api'
import './component.css'

export default function SLOTCREATOR({ t, onCreated }) {
  const [form, setForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    duration: 60
  })
  const [message, setMessage] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    try {
      const res = await fetch(`${API}/slots/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': ADMIN_PASSWORD
        },
        body: JSON.stringify({ ...form, duration: parseInt(form.duration) })
      })
      const data = await res.json()

      if (res.ok) {
        setMessage(`✓ ${data.length} créneau(x) créé(s)`)
        onCreated()
      } else {
        setMessage(data.message)
      }
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <div className="slotcreator">
      <h3>{t.admin.createSlots}</h3>
      <form onSubmit={handleSubmit}>
        <div className="slotcreator-fields">
          <label>
            {t.admin.date}
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            {t.admin.startTime}
            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
          </label>
          <label>
            {t.admin.endTime}
            <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
          </label>
          <label>
            {t.admin.duration}
            <input type="number" name="duration" value={form.duration} onChange={handleChange} min="15" max="240" required />
          </label>
        </div>
        <button type="submit">{t.admin.generate}</button>
      </form>
      {message && <p className="creator-message">{message}</p>}
    </div>
  )
}
