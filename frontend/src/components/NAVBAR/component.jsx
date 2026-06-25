import { useState, useEffect } from 'react'
import './component.css'

export default function NAVBAR({ lang, setLang, view, setView, t }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id) {
    if (view !== 'home') setView('home')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, view !== 'home' ? 100 : 0)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <button className="navbar-brand" onClick={() => setView('home')}>
        AQUA<span className="brand-dot">·</span>COACH
      </button>

      <div className="navbar-links">
        <button onClick={() => scrollTo('cours')}>{t.nav.cours}</button>
        <button onClick={() => scrollTo('tarifs')}>{t.nav.tarifs}</button>
        <button onClick={() => scrollTo('reserver')}>{t.nav.contact}</button>
        <button className="navbar-cta" onClick={() => scrollTo('reserver')}>
          {t.nav.reserver} →
        </button>
      </div>

      <div className="navbar-right">
        <div className="lang-toggle">
          <button className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>FR</button>
          <span>|</span>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
        <button
          className="admin-link"
          onClick={() => setView(view === 'admin' ? 'home' : 'admin')}
        >
          {t.nav.admin}
        </button>
      </div>
    </nav>
  )
}
