import './component.css'

const AVIS = [
  {
    nom: 'Sophie M.',
    niveau: 'Débutante',
    note: 5,
    texte:
      "Je n'avais jamais nagé de ma vie. En 8 séances, je fais mes longueurs sans m'arrêter. Le coach est patient, pédagogue et toujours encourageant."
  },
  {
    nom: 'Thomas R.',
    niveau: 'Intermédiaire',
    note: 5,
    texte:
      'Mon crawl était catastrophique. Après quelques séances ciblées sur la technique, j\'ai gagné en fluidité et en endurance. Vraiment top.'
  },
  {
    nom: 'Isabelle D.',
    niveau: 'Perfectionnement',
    note: 5,
    texte:
      'Coaching très professionnel. Les séances sont structurées, progressives et adaptées à mes objectifs de compétition. Je recommande fortement.'
  },
  {
    nom: 'Marc L.',
    niveau: 'Débutant',
    note: 4,
    texte:
      'Super expérience. Le coach s\'adapte parfaitement à mon rythme. Les piscines choisies sont toujours propres et bien situées.'
  }
]

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  )
}

export default function RATING({ t }) {
  return (
    <section className="rating">
      <div className="rating-inner">
        <p className="rating-label">AVIS</p>
        <h2 className="rating-title">{t.rating.title}</h2>
        <p className="rating-subtitle">{t.rating.subtitle}</p>

        <div className="rating-grid">
          {AVIS.map((avis, i) => (
            <div key={i} className="rating-card">
              <Stars count={avis.note} />
              <p className="rating-texte">"{avis.texte}"</p>
              <div className="rating-auteur">
                <div className="auteur-avatar">
                  {avis.nom.charAt(0)}
                </div>
                <div>
                  <div className="auteur-nom">{avis.nom}</div>
                  <div className="auteur-niveau">{avis.niveau}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
