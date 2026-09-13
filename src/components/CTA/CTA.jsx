import { useScrollReveal } from '../../hooks/useScrollReveal'
import { buildWhatsAppLink } from '../../utils/whatsapp'
import './CTA.css'

export function CTA({ content }) {
  const revealRef = useScrollReveal()
  const whatsappLink = buildWhatsAppLink(content.contact.whatsapp, content.cta.title)

  return (
    <section id="contato" className="section">
      <div className="container">
        <div className="cta reveal" ref={revealRef}>
          <img className="cta__bg" src={content.cta.image} alt="" aria-hidden="true" loading="lazy" />
          <div className="cta__overlay" />
          <div className="cta__content">
            <h2>{content.cta.title}</h2>
            <p>{content.cta.description}</p>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              {content.cta.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
