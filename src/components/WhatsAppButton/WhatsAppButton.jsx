import { buildWhatsAppLink } from '../../utils/whatsapp'
import './WhatsAppButton.css'

export function WhatsAppButton({ content }) {
  const whatsappLink = buildWhatsAppLink(
    content.contact.whatsapp,
    'Olá! Gostaria de solicitar uma avaliação para controle de pombos.'
  )

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <span className="whatsapp-fab__icon">
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.23.6 4.31 1.65 6.1L3 29l8.06-2.6a12.9 12.9 0 0 0 4.96.99h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm7.03 17.06c-.3.83-1.72 1.6-2.38 1.68-.6.08-1.36.11-2.2-.14-.5-.15-1.15-.37-1.98-.72-3.48-1.5-5.75-5.02-5.93-5.25-.17-.23-1.42-1.89-1.42-3.6 0-1.71.9-2.55 1.22-2.9.32-.34.7-.43.93-.43.23 0 .47 0 .67.01.22.01.5-.08.79.6.3.72 1.02 2.5 1.11 2.68.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.79-.18.32.12 2.03.96 2.38 1.13.35.18.58.27.67.42.09.15.09.87-.21 1.7z" />
        </svg>
      </span>
      <span className="whatsapp-fab__label">Falar no WhatsApp</span>
    </a>
  )
}
