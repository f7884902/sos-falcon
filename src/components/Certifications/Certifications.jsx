import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Certifications.css'

export function Certifications({ content }) {
  const revealRef = useScrollReveal()

  return (
    <section className="section certifications" aria-label="Conformidade e certificações">
      <div className="container" ref={revealRef}>
        <div className="certifications__header reveal">
          <p className="eyebrow">{content.certifications.eyebrow}</p>
          <h2 className="section-title">{content.certifications.title}</h2>
          <p className="section-lead">{content.certifications.description}</p>
        </div>

        <div className="certifications__grid">
          {content.certifications.items.map((item, index) => (
            <div
              key={item.label}
              className="certification-badge reveal"
              style={{ '--reveal-delay': `${index * 80}ms` }}
            >
              <div className="certification-badge__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="certification-badge__label">{item.label}</h3>
              <p className="certification-badge__description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
