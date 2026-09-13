import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Process.css'

export function Process({ content }) {
  const revealRef = useScrollReveal()

  return (
    <section id="como-funciona" className="section process">
      <div className="container" ref={revealRef}>
        <div className="process__header reveal">
          <p className="eyebrow">Como funciona</p>
          <h2 className="section-title section-title--inverse">Um processo técnico, do diagnóstico ao resultado</h2>
        </div>

        <div className="process__list">
          {content.process.map((item, index) => (
            <div key={item.step} className="process__item reveal" style={{ '--reveal-delay': `${index * 70}ms` }}>
              <span className="process__number">{item.step}</span>
              <div>
                <h3 className="process__title">{item.title}</h3>
                <p className="process__description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
