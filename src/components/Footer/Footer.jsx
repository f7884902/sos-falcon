import { buildWhatsAppLink } from '../../utils/whatsapp'
import './Footer.css'

export function Footer({ content }) {
  const whatsappLink = buildWhatsAppLink(content.contact.whatsapp)

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={content.brand.logo} alt={content.brand.fullName} />
          <p>{content.footer.description}</p>
        </div>

        <div>
          <h4>Navegação</h4>
          <ul className="footer__links">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <ul className="footer__links">
            <li>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp: {content.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
            </li>
            <li>
              <a href={content.contact.instagram} target="_blank" rel="noreferrer">
                {content.contact.instagramHandle}
              </a>
            </li>
            <li>{content.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{content.footer.copyright}</span>
      </div>
    </footer>
  )
}
