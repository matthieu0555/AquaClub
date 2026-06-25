import { useState } from 'react'
import SLOTCREATOR from '../SLOTCREATOR/component'
import SLOTLIST from '../SLOTLIST/component'
import RESERVATIONLIST from '../RESERVATIONLIST/component'
import './component.css'

export default function ADMINPANEL({ t, setView }) {
  const [tab, setTab] = useState('slots')
  const [refresh, setRefresh] = useState(0)

  function triggerRefresh() {
    setRefresh(r => r + 1)
  }

  return (
    <div className="adminpanel">
      <header className="adminpanel-header">
        <div className="adminpanel-header-left">
          <span className="adminpanel-brand">
            AQUA<span className="brand-dot">·</span>COACH
          </span>
          <span className="adminpanel-dash-label">Tableau de bord</span>
        </div>
        <button className="adminpanel-back" onClick={() => setView('home')}>
          ← Retour au site
        </button>
      </header>

      <div className="adminpanel-body">
        <div className="admin-tabs">
          <button
            className={tab === 'slots' ? 'active' : ''}
            onClick={() => setTab('slots')}
          >
            {t.admin.slots}
          </button>
          <button
            className={tab === 'reservations' ? 'active' : ''}
            onClick={() => setTab('reservations')}
          >
            {t.admin.reservations}
          </button>
        </div>

        {tab === 'slots' && (
          <div className="admin-content">
            <SLOTCREATOR t={t} onCreated={triggerRefresh} />
            <SLOTLIST key={refresh} t={t} onChanged={triggerRefresh} />
          </div>
        )}

        {tab === 'reservations' && (
          <div className="admin-content">
            <RESERVATIONLIST key={refresh} t={t} />
          </div>
        )}
      </div>

      <footer className="adminpanel-footer">
        <span className="adminpanel-footer-brand">
          AQUA<span className="brand-dot">·</span>COACH
        </span>
        <span>Espace administrateur — {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
