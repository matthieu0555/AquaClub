import './component.css'

const DATA = {
  fr: [
    {
      level: 'Débutants',
      icon: '◎',
      desc: "Pour ceux qui n'ont jamais nagé ou souhaitent reprendre en douceur. Techniques de base, sécurité dans l'eau.",
      tags: ['Aisance aquatique', 'Flottaison', 'Premiers mouvements'],
      days: 'Lun · Mer · Sam',
      duration: '45 min / séance',
      accent: 'linear-gradient(90deg, #0055b3, #3388e0)'
    },
    {
      level: 'Intermédiaires',
      icon: '◑',
      desc: 'Vous nagez déjà ? Perfectionnez crawl, dos crawlé et brasse avec un suivi personnalisé et attentif.',
      tags: ['Crawl', 'Dos crawlé', 'Brasse', 'Endurance'],
      days: 'Mar · Jeu · Sam',
      duration: '60 min / séance',
      accent: 'linear-gradient(90deg, #3388e0, #66aaee)'
    },
    {
      level: 'Perfectionnement',
      icon: '●',
      desc: 'Pour les nageurs confirmés souhaitant optimiser leur technique, améliorer le souffle et viser la performance.',
      tags: ['Papillon', 'Virages', 'Chronométrage', 'Compétition'],
      days: 'Mer · Ven · Dim',
      duration: '75 min / séance',
      accent: 'linear-gradient(90deg, #0044a0, #0077cc)'
    }
  ],
  en: [
    {
      level: 'Beginners',
      icon: '◎',
      desc: "For those who have never swum or want to start gently. Basic techniques and water safety.",
      tags: ['Water comfort', 'Floating', 'Basic strokes'],
      days: 'Mon · Wed · Sat',
      duration: '45 min / session',
      accent: 'linear-gradient(90deg, #0055b3, #3388e0)'
    },
    {
      level: 'Intermediate',
      icon: '◑',
      desc: 'Already swimming? Perfect your crawl, backstroke and breaststroke with personalized coaching.',
      tags: ['Crawl', 'Backstroke', 'Breaststroke', 'Endurance'],
      days: 'Tue · Thu · Sat',
      duration: '60 min / session',
      accent: 'linear-gradient(90deg, #3388e0, #66aaee)'
    },
    {
      level: 'Advanced',
      icon: '●',
      desc: 'For experienced swimmers looking to optimize technique, breathing and aim for competition performance.',
      tags: ['Butterfly', 'Turns', 'Timing', 'Competition'],
      days: 'Wed · Fri · Sun',
      duration: '75 min / session',
      accent: 'linear-gradient(90deg, #0044a0, #0077cc)'
    }
  ]
}

export default function COURS({ lang }) {
  const courses = DATA[lang] || DATA.fr

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="cours" className="cours">
      <div className="cours-inner">
        <div className="cours-header">
          <div>
            <p className="section-label">Les cours</p>
            <h2 className="section-title">Cours &amp; Horaires</h2>
          </div>
          <p className="cours-subtitle">
            Les créneaux sont définis directement avec votre coach selon vos disponibilités.
          </p>
        </div>

        <div className="cours-grid">
          {courses.map((course, i) => (
            <div key={i} className="cours-card">
              <div className="cours-accent" style={{ background: course.accent }} />
              <div className="cours-top">
                <div className="cours-icon">{course.icon}</div>
                <h3>{course.level}</h3>
              </div>
              <p className="cours-desc">{course.desc}</p>
              <div className="cours-tags">
                {course.tags.map(tag => (
                  <span key={tag} className="cours-tag">{tag}</span>
                ))}
              </div>
              <div className="cours-bottom">
                <div>
                  <div className="meta-label">Créneaux</div>
                  <div className="meta-value">{course.days}</div>
                </div>
                <div className="text-right">
                  <div className="meta-label">Durée</div>
                  <div className="meta-duration">{course.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cours-info">
          <span>ℹ</span>
          <p>
            Les horaires et le lieu de la piscine sont fixés en accord avec votre coach.{' '}
            <button onClick={() => scrollTo('reserver')}>Contactez-nous</button>{' '}
            pour connaître les disponibilités.
          </p>
        </div>
      </div>
    </section>
  )
}
