import { useState } from 'react'
import NAVBAR from './components/NAVBAR/component'
import HERO from './components/HERO/component'
import COURS from './components/COURS/component'
import TARIFS from './components/TARIFS/component'
import RATING from './components/RATING/component'
import CALENDAR from './components/CALENDAR/component'
import TIMESLOTS from './components/TIMESLOTS/component'
import BOOKINGFORM from './components/BOOKINGFORM/component'
import CONFIRMATION from './components/CONFIRMATION/component'
import FOOTER from './components/FOOTER/component'
import ADMINLOGIN from './components/ADMINLOGIN/component'
import ADMINPANEL from './components/ADMINPANEL/component'
import { translations } from './translations'
import './App.css'

export default function App() {
  const [lang, setLang] = useState('fr')
  const [view, setView] = useState('home')   // 'home' | 'admin'
  const [isAdmin, setIsAdmin] = useState(false)

  // Étapes de réservation : calendar → slots → form → confirmation
  const [step, setStep] = useState('calendar')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const t = translations[lang]

  function handleDateSelect(date) {
    setSelectedDate(date)
    setStep('slots')
  }

  function handleSlotSelect(slot) {
    setSelectedSlot(slot)
    setStep('form')
  }

  function handleBookingSuccess() {
    setStep('confirmation')
  }

  function resetBooking() {
    setStep('calendar')
    setSelectedDate(null)
    setSelectedSlot(null)
  }

  return (
    <div className="app">
      <NAVBAR
        lang={lang}
        setLang={setLang}
        view={view}
        setView={setView}
        t={t}
      />

      {view === 'home' && (
        <>
          <HERO t={t} />
          <COURS lang={lang} />
          <TARIFS lang={lang} />
          <RATING t={t} />

          <section id="reserver" className="booking-section">
            <div className="booking-inner">
              <p className="section-label">Réservation</p>
              <h2 className="section-title">{t.booking.title}</h2>
              <div className={`booking-flow${step === 'form' ? ' booking-flow-form' : ''}`}>
                {step === 'calendar' && (
                  <CALENDAR lang={lang} t={t} onDateSelect={handleDateSelect} />
                )}
                {step === 'slots' && (
                  <TIMESLOTS
                    date={selectedDate}
                    t={t}
                    onSlotSelect={handleSlotSelect}
                    onBack={() => setStep('calendar')}
                  />
                )}
                {step === 'form' && (
                  <BOOKINGFORM
                    slot={selectedSlot}
                    lang={lang}
                    t={t}
                    onSuccess={handleBookingSuccess}
                    onBack={() => setStep('slots')}
                  />
                )}
                {step === 'confirmation' && (
                  <CONFIRMATION
                    slot={selectedSlot}
                    t={t}
                    onBack={resetBooking}
                  />
                )}
              </div>
            </div>
          </section>

          <FOOTER />
        </>
      )}

      {view === 'admin' && (
        isAdmin
          ? <ADMINPANEL t={t} setView={setView} />
          : <ADMINLOGIN t={t} onLogin={() => setIsAdmin(true)} setView={setView} />
      )}
    </div>
  )
}
