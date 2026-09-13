import { useEffect, useState } from 'react'
import { buildWhatsAppLink } from '../../utils/whatsapp'
import './Header.css'

export function Header({ content }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const whatsappLink = buildWhatsAppLink(
    content.contact.whatsapp,
    'Olá! Gostaria de solicitar uma avaliação para controle de pombos.'
  )

  return (
    <>
      <header className={`header ${isScrolled || isMenuOpen ? 'is-scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#inicio" className="header__logo" aria-label={`${content.brand.fullName} — página inicial`}>
          <img src={content.brand.logo} alt={content.brand.fullName} />
        </a>

        <nav className="header__nav" aria-label="Navegação principal">
          <ul>
            {content.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-outline header__cta">
            Solicitar avaliação
          </a>
          <button
            type="button"
            className="header__toggle"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
      </header>

      <div className={`header__mobile-panel ${isMenuOpen ? 'is-open' : ''}`}>
        <ul>
          {content.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          onClick={() => setIsMenuOpen(false)}
        >
          Solicitar avaliação
        </a>
      </div>
    </>
  )
}
