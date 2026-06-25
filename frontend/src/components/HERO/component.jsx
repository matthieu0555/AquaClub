import './component.css'

export default function HERO({ t }) {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      {/* Anneaux décoratifs animés */}
      <div className="ring ring-1" />
      <div className="ring ring-2" />
      <div className="ring ring-3" />
      <div className="ring ring-4" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="hero-headline">
          {t.hero.headline.map((line, i) => (
            <span key={i} className={i === 1 ? 'blue' : ''}>{line}</span>
          ))}
        </h1>

        <p className="hero-description">{t.hero.description}</p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => scrollTo('reserver')}>
            {t.hero.cta}
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('cours')}>
            {t.hero.discover} <span>↓</span>
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-value blue">{t.hero.stats[0].value}</span>
            <span className="stat-label">{t.hero.stats[0].label}</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <span className="stat-value">{t.hero.stats[1].value}</span>
            <span className="stat-label">{t.hero.stats[1].label}</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <span className="stat-value blue">{t.hero.stats[2].value}</span>
            <span className="stat-label">{t.hero.stats[2].label}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
