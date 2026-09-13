import { useEffect, useRef } from 'react'
import { buildWhatsAppLink } from '../../utils/whatsapp'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Hero.css'

export function Hero({ content }) {
  const imageRef = useRef(null)
  const revealRef = useScrollReveal()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    let ticking = false

    const applyParallax = () => {
      ticking = false
      const scrollY = window.scrollY
      const shift = Math.min(scrollY * 0.15, 80)
      imageRef.current?.style.setProperty('--hero-shift', `${shift}px`)
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(applyParallax)
        ticking = true
      }
    }

    applyParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const whatsappLink = buildWhatsAppLink(
    content.contact.whatsapp,
    'Olá! Gostaria de solicitar uma avaliação para controle de pombos.'
  )

  return (
    <section id="inicio" className="hero" ref={revealRef}>
      <div className="hero__media">
        <img
          ref={imageRef}
          className="hero__image"
          src={content.hero.image}
          alt={content.hero.imageAlt}
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow reveal">{content.hero.eyebrow}</p>
        <h1 className="hero__title reveal" style={{ '--reveal-delay': '80ms' }}>
          {content.hero.title}
        </h1>
        <p className="hero__subtitle reveal" style={{ '--reveal-delay': '160ms' }}>
          {content.hero.subtitle}
        </p>
        <div className="hero__actions reveal" style={{ '--reveal-delay': '240ms' }}>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            {content.hero.ctaPrimaryLabel}
          </a>
          <a href={content.hero.ctaSecondaryHref} className="btn btn-outline">
            {content.hero.ctaSecondaryLabel}
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <span>Role para explorar</span>
        <span className="line" />
      </div>
    </section>
  )
}
