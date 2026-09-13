import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Services.css'

export function Services({ content }) {
  const revealRef = useScrollReveal()

  return (
    <section id="servicos" className="section services">
      <div className="container" ref={revealRef}>
        <div className="services__header reveal">
          <p className="eyebrow">Nossos serviços</p>
          <h2 className="section-title">Soluções técnicas para cada tipo de ambiente</h2>
        </div>

        <div className="services__grid">
          {content.services.map((service, index) => (
            <article
              key={service.title}
              className="service-card reveal"
              style={{ '--reveal-delay': `${index * 90}ms` }}
              tabIndex={0}
            >
              <img
                className="service-card__image"
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                decoding="async"
              />
              <div className="service-card__overlay" />
              <div className="service-card__content">
                <span className="service-card__number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
