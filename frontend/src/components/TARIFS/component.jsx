import './component.css'

const DATA = {
  fr: [
    {
      name: 'Séance Unique',
      price: '45 $',
      unit: 'CAD / séance',
      badge: null,
      save: null,
      featured: false,
      features: ["1 heure de coaching", "Bilan initial offert", "Adaptation au niveau", "Piscine fournie"],
      cta: 'Choisir cette formule'
    },
    {
      name: 'Pack 5 Séances',
      price: '200 $',
      unit: 'CAD / pack',
      badge: 'Populaire',
      save: 'Économisez 25 $',
      featured: true,
      features: ["5 séances d'1h", "Bilan mensuel", "Programme personnalisé", "Suivi des progrès", "Priorité de réservation"],
      cta: 'Choisir cette formule'
    },
    {
      name: 'Pack 10 Séances',
      price: '380 $',
      unit: 'CAD / pack',
      badge: null,
      save: 'Économisez 70 $',
      featured: false,
      features: ["10 séances d'1h", "Bilan mensuel complet", "Programme personnalisé", "Suivi vidéo optionnel", "Priorité absolue", "Accès aux ressources"],
      cta: 'Choisir cette formule'
    }
  ],
  en: [
    {
      name: 'Single Session',
      price: '45 $',
      unit: 'CAD / session',
      badge: null,
      save: null,
      featured: false,
      features: ["1 hour coaching", "Free initial assessment", "Level adaptation", "Pool included"],
      cta: 'Choose this plan'
    },
    {
      name: '5-Session Pack',
      price: '200 $',
      unit: 'CAD / pack',
      badge: 'Popular',
      save: 'Save 25 $',
      featured: true,
      features: ["5 x 1h sessions", "Monthly assessment", "Personalized program", "Progress tracking", "Booking priority"],
      cta: 'Choose this plan'
    },
    {
      name: '10-Session Pack',
      price: '380 $',
      unit: 'CAD / pack',
      badge: null,
      save: 'Save 70 $',
      featured: false,
      features: ["10 x 1h sessions", "Full monthly assessment", "Personalized program", "Optional video review", "Absolute priority", "Resource access"],
      cta: 'Choose this plan'
    }
  ]
}

export default function TARIFS({ lang }) {
  const plans = DATA[lang] || DATA.fr

  function scrollToBooking() {
    document.getElementById('reserver')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="tarifs" className="tarifs">
      <div className="tarifs-inner">
        <div className="tarifs-header">
          <p className="section-label">Formules</p>
          <h2 className="section-title">Tarifs &amp; Inscriptions</h2>
          <p className="tarifs-subtitle">
            Commencez à votre rythme. Des formules adaptées à votre pratique.
          </p>
        </div>

        <div className="tarifs-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`tarif-card${plan.featured ? ' featured' : ''}`}>
              {plan.badge && <span className="tarif-badge">{plan.badge}</span>}
              <div className="tarif-name">{plan.name}</div>
              {plan.save && <span className="tarif-save">{plan.save}</span>}
              <div className="tarif-price">
                <span className="price-value">{plan.price}</span>
                <span className="price-unit">{plan.unit}</span>
              </div>
              <ul className="tarif-features">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <span className="feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="tarif-cta" onClick={scrollToBooking}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="tarifs-note">* Prix en dollars canadiens (CAD) — lieu de la piscine à confirmer avec votre coach.</p>
      </div>
    </section>
  )
}
