import { useScrollReveal } from '../../hooks/useScrollReveal'
import './About.css'

export function About({ content }) {
  const revealRef = useScrollReveal()

  return (
    <section id="sobre" className="section about">
      <div className="container about__grid" ref={revealRef}>
        <div className="about__visual reveal">
          <div className="about__stat">
            <strong>100%</strong>
            <span>Método biológico, sem venenos</span>
          </div>
          <div className="about__image-main">
            <img src={content.about.image} alt={content.about.imageAlt} loading="lazy" decoding="async" />
          </div>
          <div className="about__image-secondary">
            <img
              src={content.about.secondaryImage}
              alt={content.about.secondaryImageAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="about__content reveal" style={{ '--reveal-delay': '120ms' }}>
          <p className="eyebrow">{content.about.eyebrow}</p>
          <h2 className="section-title">{content.about.title}</h2>
          <div className="about__divider" />
          <p>{content.about.description}</p>
          <p>{content.about.secondaryText}</p>
        </div>
      </div>
    </section>
  )
}
