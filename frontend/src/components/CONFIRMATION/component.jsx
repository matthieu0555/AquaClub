import './component.css'

export default function CONFIRMATION({ slot, t, onBack }) {
  return (
    <div className="confirmation">
      <div className="confirmation-check">✓</div>
      <h2>{t.confirmation.title}</h2>
      <p>{t.confirmation.message}</p>

      {slot && (
        <div className="confirmation-detail">
          {slot.date} · {slot.startTime} – {slot.endTime}
        </div>
      )}

      <p className="confirmation-sub">{t.confirmation.detail}</p>

      <button onClick={onBack}>{t.confirmation.backHome}</button>
    </div>
  )
}
