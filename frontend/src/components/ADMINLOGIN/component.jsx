import { useState } from 'react'
import { ADMIN_PASSWORD } from '../../api'
import './component.css'

export default function ADMINLOGIN({ t, onLogin, setView }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="adminlogin-page">
      <div className="adminlogin-card">
        <span className="adminlogin-brand">
          AQUA<span className="brand-dot">·</span>COACH
        </span>
        <h2 className="adminlogin-title">{t.admin.login}</h2>
        <p className="adminlogin-sub">Espace réservé à l'administrateur</p>
        <form className="adminlogin-form" onSubmit={handleSubmit}>
          <input
            className="adminlogin-input"
            type="password"
            placeholder={t.admin.password}
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
          />
          {error && <p className="adminlogin-error">{t.admin.wrongPassword}</p>}
          <button type="submit" className="adminlogin-submit">{t.admin.enter}</button>
        </form>
        <button className="adminlogin-back" onClick={() => setView('home')}>
          ← Retour au site
        </button>
      </div>
    </div>
  )
}
