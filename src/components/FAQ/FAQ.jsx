import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './FAQ.css'

export function FAQ({ content }) {
  const revealRef = useScrollReveal()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section">
      <div className="container" ref={revealRef}>
        <div className="faq__header reveal">
          <p className="eyebrow">{content.faq.eyebrow}</p>
          <h2 className="section-title">{content.faq.title}</h2>
        </div>

        <div className="faq__list reveal" style={{ '--reveal-delay': '80ms' }}>
          {content.faq.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div className="faq-item" data-open={isOpen} key={item.question}>
                <button
                  type="button"
                  className="faq-item__question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className="faq-item__answer-wrap" id={`faq-answer-${index}`}>
                  <p className="faq-item__answer">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
