import { useScrollReveal } from '../../hooks/useScrollReveal'
import './TrustBar.css'

export function TrustBar({ content }) {
  const revealRef = useScrollReveal()

  return (
    <section className="trust-bar" aria-label="Diferenciais">
      <div className="container trust-bar__grid" ref={revealRef}>
        {content.trust.map((item, index) => (
          <div
            key={item.title}
            className="trust-bar__item reveal"
            style={{ '--reveal-delay': `${index * 90}ms` }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
