import './component.css'

export default function FOOTER() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-brand">
        AQUA<span className="brand-dot">·</span>COACH
      </div>
      <p className="footer-copy">© 2025 AquaCoach — Tous droits réservés</p>
      <div className="footer-links">
        <button onClick={() => scrollTo('cours')}>Cours</button>
        <button onClick={() => scrollTo('tarifs')}>Tarifs</button>
        <button onClick={() => scrollTo('reserver')}>Réserver</button>
      </div>
    </footer>
  )
}
