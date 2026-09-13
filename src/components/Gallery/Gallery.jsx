import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Gallery.css'

export function Gallery({ content }) {
  const revealRef = useScrollReveal()
  const [activeIndex, setActiveIndex] = useState(null)
  const images = content.gallery

  const close = () => setActiveIndex(null)
  const showPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)
  const showNext = () => setActiveIndex((i) => (i + 1) % images.length)

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  const active = activeIndex !== null ? images[activeIndex] : null

  return (
    <section id="galeria" className="section gallery">
      <div className="container" ref={revealRef}>
        <div className="gallery__header reveal">
          <p className="eyebrow">Galeria</p>
          <h2 className="section-title">Nossa atuação em campo</h2>
        </div>

        <div className="gallery__grid">
          {images.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className="gallery__item reveal"
              style={{ '--reveal-delay': `${(index % 6) * 60}ms` }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ampliar imagem: ${item.caption}`}
            >
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <span className="gallery__caption">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="gallery__lightbox" role="dialog" aria-modal="true" aria-label={active.caption} onClick={close}>
          <button type="button" className="gallery__lightbox-close" onClick={close} aria-label="Fechar">
            ✕
          </button>
          <button
            type="button"
            className="gallery__lightbox-nav gallery__lightbox-nav--prev"
            aria-label="Imagem anterior"
            onClick={(event) => {
              event.stopPropagation()
              showPrev()
            }}
          >
            ‹
          </button>
          <img
            className="gallery__lightbox-image"
            src={active.image}
            alt={active.alt}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="gallery__lightbox-nav gallery__lightbox-nav--next"
            aria-label="Próxima imagem"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
          >
            ›
          </button>
          <p className="gallery__lightbox-caption">{active.caption}</p>
        </div>
      )}
    </section>
  )
}
